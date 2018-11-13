import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import { searchRobots } from './reducers';

import * as serviceWorker from './serviceWorker';
import 'tachyons';
import './index.css';

const rootReducer = combineReducers({ searchRobots });

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
