import {createLogic} from 'redux-logic'

import {actionTypes} from './actions'
import * as actions from './actions'

const toggleTimerLogic = createLogic({
  type: actionTypes.TOGGLE_TIMER,
  cancelType: actionTypes.RESET_TIMER,
  process: ({action, cancelled$}, dispatch, done) => {
    const timeoutId = setInterval(() => {
      dispatch(actions.decrementTimerDurationRemaining(action.timer))
    }, 1000)
    cancelled$.subscribe(() => {
      clearInterval(timeoutId)
      done()
    })
  }
})

const decrementTimerDurationRemainingLogic = createLogic({
  type: actionTypes.DECREMENT_TIMER_DURATION_REMAINING,
  process: ({getState, action}, dispatch, done) => {
    if (getState().timers[action.timer.id].durationRemaining === 0) {
      dispatch(actions.resetTimer(action.timer))
    }
    done()
  }
})

export default [
  toggleTimerLogic,
  decrementTimerDurationRemainingLogic
]
