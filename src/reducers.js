import {actionTypes} from './actions'

export const timers = (state = {}, action) => {
  const timer = action.timer || action.payload
  switch (action.type) {
    case (actionTypes.CREATE_TIMER):
      return {
        ...state,
        [timer.id]: timer
      }
    case (actionTypes.TOGGLE_TIMER):
      return {
        ...state,
        [timer.id]: {
          ...timer,
          running: !state[timer.id].running
        }
      }
    case (actionTypes.RESET_TIMER):
      return {
        ...state,
        [timer.id]: {
          ...timer,
          running: false,
          durationRemaining: timer.duration
        }
      }
    case (actionTypes.DECREMENT_TIMER_DURATION_REMAINING):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          durationRemaining: state[timer.id].durationRemaining - 1000
        }
      }
    default:
      return state
  }
}
