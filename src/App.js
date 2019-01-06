
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';
import Writer from './pages/writer';

import store from './store';

// 注释
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/detail/:id' exact component={Detail} />
            <Route path='/login' exact component={Login} />
            <Route path='/writer' exact component={Writer} />
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
