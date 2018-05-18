import regeneratorRuntime from 'regenerator-runtime/runtime'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {createLogicMiddleware} from 'redux-logic'
import {createLogger} from 'redux-logger'

import '../css/main.css'
import * as reducers from './reducers'
import * as actions from './actions'
import {actionTypes} from './actions'
import logic from './logic'
import TimerList from './containers/timer-list'
import StatePreview from './containers/state-preview'
import App from './components/app'

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(
    createLogger({collapsed: true}),
    createLogicMiddleware(logic)
  )
)

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))
const drive = async () => {
  store.dispatch(actions.createTimer('study', 'Study', 1 * 10 * 1000))
  // const timer = (store.getState().timers.study)
  // store.dispatch(actions.toggleTimer(timer))
  // await sleep(3)
  // store.dispatch(actions.toggleTimer(timer))
  // await sleep(2)
  // store.dispatch(actions.toggleTimer(timer))
  // store.dispatch(actions.duplicateTimer(timer))
  // store.dispatch(actions.editTimerProperty(timer, 'name', 'Washer'))
}

drive()

render(
  <Provider store={store}>
    <div>
      <TimerList />
      <div style={{width: '400px', margin: 'auto'}}>
        <StatePreview/>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
)
