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
  applyMiddleware(
    createLogger({collapsed: true}),
    createLogicMiddleware(logic)
  )
)

const App = connect(
  state => ({value: state})
)(ValuePre)

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))
const drive = async () => {
  store.dispatch(actions.createTimer('study', 'study', 10 * 1000))
  const timer = (store.getState().timers.study)
  store.dispatch(actions.toggleTimer(timer))
  await sleep(3)
  store.dispatch(actions.toggleTimer(timer))
  await sleep(4)
  store.dispatch(actions.incrementTimerDurationRemaining(timer))
  await sleep(1)
  store.dispatch(actions.toggleTimer(timer))
  store.dispatch(actions.nameTimer(timer, 'hooli'))
  store.dispatch(actions.duplicateTimer(timer))
}

drive()

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
