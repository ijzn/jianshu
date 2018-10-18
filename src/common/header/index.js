import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreator } from './store';
import { actionCreators as loginActionCreator } from '../../pages/login/store';

import { Link } from 'react-router-dom';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Btn,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style';




class Header extends Component {

  getListArea = () => {
    const { focused, list, page, totalPage, mouseIn, handleMouseIn, handleMouseOut, handleChangePage } = this.props;
    const JSlist = list.toJS();
    const pageList = [];

    if (list.size > 0) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={JSlist[i]}>{JSlist[i]}</SearchInfoItem>
        )
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
        >
          <SearchInfoTitle>
            热文搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.icon)}>
              <i ref={(icon => this.icon = icon)} className='iconfont icon-spin spin'></i>
              换一换
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  

  render() {
    const { focused, list, LoginState, logout, handleInputFocus, handleInputBlur } = this.props;
    
    return (
      <div>
        <HeaderWrapper>
          <Link to='/'>
            <Logo />
          </Link>
          <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载app</NavItem>
            {
              LoginState ?
              <NavItem className='right' onClick={logout}>退出</NavItem>
              :
              <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
            }
            
            <NavItem className='right'>
              <i className='iconfont icon-Aa'></i>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                timeout={500}
                in={focused}
                classNames='slide'
              >
                <NavSearch
                  className={focused ? 'focused' : null}
                  onFocus={() => handleInputFocus(list)}
                  onBlur={handleInputBlur}
                ></NavSearch>
              </CSSTransition>
              <i
                className={focused ? 'focused iconfont icon-fangdajing zoom' : 'zoom iconfont icon-fangdajing'}></i>
              {this.getListArea(focused, list)}
            </SearchWrapper>
          </Nav>
          <Addition>
            <Btn className='reg'>注册</Btn>
            <Link to='/writer'>
              <Btn className='writting'>
                <i className='iconfont icon-pen'></i>
                写文章
              </Btn>
            </Link>
          </Addition>
        </HeaderWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    LoginState: state.getIn(['login', 'loginState'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      // 发送请求 热文搜索
      if (list.size === 0) {
        dispatch(actionCreator.getList())
      }
      // 控制 搜索框 的长短
      dispatch(actionCreator.searchFocus())
    },
    handleInputBlur() {
      const action = actionCreator.inputBlur()
      dispatch(action)
    },
    // 鼠标移入 热文搜索
    handleMouseIn() {
      dispatch(actionCreator.mouseIn())
    },
    // 鼠标移除 热文搜索
    handleMouseOut() {
      dispatch(actionCreator.mouseOut())
    },
    // 换一批
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';


      if (page < totalPage) {
        dispatch(actionCreator.changePage(page + 1))
      } else {
        dispatch(actionCreator.changePage(1))
      }
    },
    // 退出
    logout () {
      dispatch(loginActionCreator.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)