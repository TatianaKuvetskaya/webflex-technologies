import { Injectable } from '@angular/core';

import {Actions, Effect, ofType} from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as templateActions from '../actions/template.actions';
import {templateData} from '../../templateData.const';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';

@Injectable()
export class TemplateEffects {

  @Effect({dispatch: false})
  getTemplates$ = this.actions$
    .pipe(
      ofType(templateActions.GET_TEMPLATES),
      map(() =>  setTimeout(() => {
        this.store.dispatch(new templateActions.AddTemplate(templateData));
      }, 1500))
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {
  }
}
