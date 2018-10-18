import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const initState = fromJS({
  loginState: false
})

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return state.set('loginState', true)
    case actionTypes.LOGOUT:
      return state.set('loginState', false)
    default:
      return state
  }
};

