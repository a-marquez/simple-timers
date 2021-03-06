import {createLogic} from 'redux-logic'

import {actionTypes} from './actions'
import * as actions from './actions'

const toggleTimerLogic = createLogic({
  type: actionTypes.TOGGLE_TIMER,
  process: ({getState, action, cancelled$}, dispatch, done) => {
    const timer = getState().timers[action.timer.id]
    if (timer.running === false) {
      dispatch(actions.pauseTimer(timer))
      done()
    }

    dispatch(actions.decrementTimerDurationRemaining(action.timer))
    const timeoutId = setInterval(() => {
      if (
        getState().timers[action.timer.id] === undefined ||
        getState().timers[action.timer.id].running === false
      ) {
        clearInterval(timeoutId)
        done()
        return
      }
      dispatch(actions.decrementTimerDurationRemaining(action.timer))
    }, 1000)

    cancelled$.subscribe(cancelAction => {
      clearInterval(timeoutId)
      done()
    })
  }
})

const decrementTimerDurationRemainingLogic = createLogic({
  type: actionTypes.DECREMENT_TIMER_DURATION_REMAINING,
  process: ({getState, action}, dispatch, done) => {
    if (getState().timers[action.timer.id].durationRemaining <= 0) {
      document.getElementById('alert').play()
      dispatch(actions.resetTimer(action.timer))
    }
    done()
  }
})

export default [
  toggleTimerLogic,
  decrementTimerDurationRemainingLogic
]
