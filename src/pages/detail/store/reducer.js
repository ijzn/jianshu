import * as actionType from './actionType';
import { fromJS } from 'immutable';
const initState = fromJS({
  title: '',
  content: ''
})


export default (state = initState, action) => {
  switch (action.type) {
    case actionType.INITDETAILlDATA:
      return state.merge({
        title: action.title,
        content: action.content
      })
    default:
      return state
  }
};
