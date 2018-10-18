import * as actionType from './actionType';
import axios from 'axios';

const initDetailData = (data) => {
  return {
    type: actionType.INITDETAILlDATA,
    title: data.title,
    content: data.content
  }
}

export const getDetailData = () => {
  return (dispatch) => {
    axios.get('/api/detail.json')
      .then((res) => {
        const {data} = res.data;
        dispatch(initDetailData(data))
      })
  }
}
