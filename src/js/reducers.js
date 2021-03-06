import {reject} from 'ramda'
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
    case (actionTypes.EDIT_TIMER_PROPERTY):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          [action.property]: action.value
        }
      }
    case (actionTypes.TOGGLE_TIMER_PROPERTY):
      return {
        ...state,
        [timer.id]: {
          ...state[timer.id],
          [action.property]: !state[timer.id][action.property]
        }
      }
    case (actionTypes.DUPLICATE_TIMER):
      const id = uuid()
      return {
        ...state,
        [id]: {
          ...state[timer.id],
          name: `Copy of ${timer.name}`,
          durationRemaining: timer.duration,
          favourite: false,
          running: false,
          id
        }
      }
    case (actionTypes.DELETE_TIMER):
      return reject(timer => timer.id === action.timer.id, {...state})
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
