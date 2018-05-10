import regeneratorRuntime from 'regenerator-runtime/runtime'
import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {createLogicMiddleware} from 'redux-logic'
import {createLogger} from 'redux-logger'
import ValuePre from 'value-pre'

import * as reducers from './reducers'
import * as actions from './actions'
import {actionTypes} from './actions'
import logic from './logic'

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(
    createLogger({collapsed: true}),
    createLogicMiddleware(logic)
  )
)

const App = connect(
  state => ({value: state})
)(ValuePre)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

store.dispatch(actions.createTimer('study', 'study', .05 * 60 * 1000))
setTimeout(() => {
  const timer = (store.getState().timers.study)
  store.dispatch(actions.toggleTimer(timer))
}, 1 * 1000)
