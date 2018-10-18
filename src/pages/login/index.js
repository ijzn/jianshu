import React, { Component } from 'react'
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from './store/actionCreators';
class Login extends Component {
  render() {
    const { loginState } = this.props;
    if (!loginState) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder='账号' innerRef={(input) => { this.account = input }} />
            <Input placeholder='密码' type='password' innerRef={(input) => { this.password = input }} />
            <Button onClick={() => this.props.login(this.account, this.password)}>登陆</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (userName, password) => {
      dispatch(actionCreators.getLoginState(userName.value, password.value))
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    loginState: state.getIn(['login', 'loginState'])
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
