import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {TemplateData} from '../store/models';
import {Store} from '@ngrx/store';
import * as templateActions from '../store/actions/template.actions';
import {AppState} from '../store/app.state';
import {takeUntil} from 'rxjs/operators';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private templateData: TemplateData;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public templateDataSub: Observable<TemplateData[]> = this.store.select('templateData');

  constructor(private store: Store<AppState>,
              private router: Router,
              private homeService: HomeService,
              private route: ActivatedRoute) {
    this.store.dispatch(new templateActions.GetTemplate());
    if (!this.homeService.sheet) {
      this.homeService.sheet = document.createElement('style');
      document.getElementsByTagName('head')[0].appendChild(this.homeService.sheet);
    }
  }

  ngOnInit() {
    this.getTemplateData();
  }

  getTemplateData() {
    this.templateDataSub
      .pipe(takeUntil(this.destroy$))
      .subscribe((templates: TemplateData[]) => {
        if (!templates.templateData) {
          return;
        }
        this.templateData = templates.templateData;
        if (!this.homeService.tenantStyles) {
          this.homeService.tenantStyles = document.createElement('style');
          this.homeService.tenantStyles.innerHTML = this.templateData.tenant.css;
          document.getElementsByTagName('head')[0].appendChild(this.homeService.tenantStyles);
        }
        this.subscribeOnRouter();
      });
  }

  subscribeOnRouter() {
    this.sub = this.route.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => {
        if (!name || name === '/') {
          name = 'homepage';
        }
        this.parseTemplate(name);
      });
  }

  parseTemplate(name: string) {
    const node = this.templateData.nodes.find(nodeItem => nodeItem.name === name);
    if (!node) {
      this.router.navigate([name], {replaceUrl: true});
      return;
    }
    const template = this.templateData.templates.find(templateItem => templateItem.id === node.id);
    const data = {
      content: node.content.html,
      node
    };
    this.homeService.sheet.innerHTML = template.css;
    const html = _.template(template.content)(data)
      .replace(/href="/g, 'href="/#')
      .replace(/href="\/#javascript/g, 'href="javascript');
    document.getElementById('container').innerHTML = html;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
