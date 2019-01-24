import { Action } from '@ngrx/store';
import { TemplateData } from '../models';

export const ADD_TEMPLATE = '[TEMPLATE] Add';

export class AddTemplate implements Action {
  readonly type = ADD_TEMPLATE;

  constructor(public payload: TemplateData) {}
}


export type Actions = AddTemplate;
