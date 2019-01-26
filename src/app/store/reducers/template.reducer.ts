import {TemplateData} from '../models/template.model';
import * as TemplateActions from '../actions/template.actions';

const initialState: TemplateData = {
  tenant: null,
  nodes: [],
  templates: []
};

export function templateReducer(state: TemplateData = initialState, action: TemplateActions.Actions) {

  switch (action.type) {
    case TemplateActions.GET_TEMPLATE_SUCCESS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
