import uuid from 'uuid/v1'

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
          ...state[timer.id],
          running: !state[timer.id].running
        }
      }
    case (actionTypes.PAUSE_TIMER):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          running: false
        }
      }
    case (actionTypes.RESET_TIMER):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          running: false,
          durationRemaining: timer.duration
        }
      }
    case (actionTypes.NAME_TIMER):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          name: action.name
        }
      }
    case (actionTypes.DUPLICATE_TIMER):
      const id = uuid()
      return {
        ...state,
        [id]: {
          ...state[timer.id],
          id
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
    case (actionTypes.INCREMENT_TIMER_DURATION_REMAINING):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          durationRemaining: state[timer.id].durationRemaining + 10 * 1000
        }
      }
    default:
      return state
  }
}
