import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';


const initState = fromJS({
  articleList: [],
  recommendList: [],
  topicList: [],
})

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_HOME_DATA:
      return state.merge({
        articleList: action.articleList,
        recommendList: action.recommendList,
        topicList: action.topicList
      });
    default:
      return state;
  }
}