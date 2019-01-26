import { Action } from '@ngrx/store';
import { TemplateData } from '../models';

export const GET_TEMPLATES = '[TEMPLATE] Get';
export const GET_TEMPLATE_SUCCESS = '[TEMPLATE] Get Success';

export class GetTemplateSuccess implements Action {
  readonly type = GET_TEMPLATE_SUCCESS;

  constructor(public payload: TemplateData) {}
}

export class GetTemplate implements Action {
  readonly type = GET_TEMPLATES;
}

export type Actions = GetTemplate | GetTemplateSuccess;
