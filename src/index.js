import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {postsReducer} from './store/reducers/postsReducer';
import {currentPostReducer} from './store/reducers/currentPostReducer';
import thunk from 'redux-thunk';

import './index.css';

import App from './App';
import {BrowserRouter} from 'react-router-dom';

const mainReducer = combineReducers({
  posts: postsReducer,
  current: currentPostReducer,
});
const store = createStore(mainReducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);


