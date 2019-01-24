import { TemplateData } from '../models/template.model';
import * as TemplateActions from '../actions/template.actions';
import {templateData} from '../../templateData.const';

const initialState: TemplateData = templateData;

export function templateReducer(state: TemplateData[] = [initialState], action: TemplateActions.Actions) {

  switch (action.type) {
    case TemplateActions.ADD_TEMPLATE:
      return {...state, templateData: action.payload};
    default:
      return state;
  }
}
