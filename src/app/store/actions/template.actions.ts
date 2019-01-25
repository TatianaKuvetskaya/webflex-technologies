import { Action } from '@ngrx/store';
import { TemplateData } from '../models';

export const GET_TEMPLATES = '[TEMPLATE] Get';
export const ADD_TEMPLATE = '[TEMPLATE] Add';

export class AddTemplate implements Action {
  readonly type = ADD_TEMPLATE;

  constructor(public payload: TemplateData) {}
}

export class GetTemplate implements Action {
  readonly type = GET_TEMPLATES;
}

export type Actions = GetTemplate | AddTemplate;
