import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'bootstrap/scss/bootstrap.scss'
import promiseMiddleware from 'redux-promise';

import MainLayout from './components/main-layout';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MainLayout />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();