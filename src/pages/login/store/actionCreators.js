import * as actionTypes from './actionTypes';
import axios from 'axios';


const login = () => {
  return {
    type: actionTypes.LOGIN
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}


export const getLoginState = (userName, passWord) => {
  return (dispatch) => {
    axios.get(`/api/login.json?user=${userName}&passWord=${passWord}`)
      .then((res) => {
        const { data } = res.data;
        if (data) {
          dispatch(login())
        }
      })
  }
}