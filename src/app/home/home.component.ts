import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {TemplateData} from '../store/models';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private sheet: Element;
  public isNotFound = false;
  public templateDataSub: Observable<TemplateData[]> = this.store.select('templateData');

  constructor(private store: Store<AppState>,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.sheet = document.createElement('style');
      document.body.appendChild(this.sheet);
      this.subscribeOnRouter();
    }, 1500);
  }

  subscribeOnRouter() {
    this.sub = this.route.fragment.subscribe(name => {
      if (!name || name === '/') {
        name = 'homepage';
      }
      this.templateDataSub.subscribe((templates: TemplateData[]) => {
        this.parseTemplate(templates[0], name);
      });
    });
  }

  parseTemplate(templateData: TemplateData, name: string) {
    const node = templateData.nodes.find(nodeItem => nodeItem.name === name);
    if (!node) {
      this.isNotFound = true;
      return;
    }
    this.isNotFound = false;
    const template = templateData.templates.find(templateItem => templateItem.id === node.id);
    const data = {
      content: node.content.html,
      node
    };
    const globalCss = templateData.tenant.css + template.css;
    this.sheet.innerHTML = globalCss;
    const html = _.template(template.content)(data)
      .replace(/href="/g, 'href="/#')
      .replace(/href="\/#javascript/g, 'href="javascript');

    setTimeout(() => {
      document.getElementById('container').innerHTML = html;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
