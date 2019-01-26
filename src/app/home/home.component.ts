import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {TemplateData} from '../store/models';
import {Store} from '@ngrx/store';
import * as templateActions from '../store/actions/template.actions';
import {AppState} from '../store/app.state';
import {takeUntil} from 'rxjs/operators';
import {HeadStylesService} from './head-styles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private templateData: TemplateData;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>,
              private router: Router,
              private headStylesService: HeadStylesService,
              private route: ActivatedRoute) {
    this.headStylesService.createSheet();
  }

  ngOnInit() {
    this.store.dispatch(new templateActions.GetTemplate());
    this.getTemplateData();
  }

  getTemplateData() {
    this.store.select('templateData')
      .pipe(takeUntil(this.destroy$))
      .subscribe((templateData: TemplateData) => {
        if (!templateData.tenant) {
          return;
        }
        this.templateData = templateData;
        this.headStylesService.setTenantStyles(this.templateData.tenant.css);
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
    this.headStylesService.setTemplateStyles(template.css);
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
