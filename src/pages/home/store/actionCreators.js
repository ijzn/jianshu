import * as actionTypes from './actionTypes';
import axios from 'axios';



export const changeHomeData = (data) => ({
  type: actionTypes.CHANGE_HOME_DATA,
  recommendList: data.recommendList,
  topicList: data.topicList,
  articleList: data.articleList
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
      .then((res) => {
        const { data } = res.data;
        dispatch(changeHomeData(data))
      })
  }
}