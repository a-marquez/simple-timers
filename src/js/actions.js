import {reduce} from 'ramda'
import Enum from 'es6-enum'
import {camelize} from 'humps'

export const actionTypes = new Enum(
  'CREATE_TIMER',
  'TOGGLE_TIMER',
  'RESET_TIMER',
  'PAUSE_TIMER',
  'EDIT_TIMER_PROPERTY',
  'TOGGLE_TIMER_PROPERTY',
  'DUPLICATE_TIMER',
  'DELETE_TIMER',
  'DECREMENT_TIMER_DURATION_REMAINING'
)

export const createTimer = (id, name, duration) => ({
  type: actionTypes.CREATE_TIMER,
  timer: {
    id,
    name,
    duration,
    durationRemaining: duration,
    notification: true,
    favourite: false,
    selected: false,
    running: false
  }
})

// const simpleActions = reduce(
//   (accumulator, [actionType, actionFn]) => {
//     accumulator[camelize(actionType.toLowerCase())] = (...any) => ({
//       type: actionTypes[actionType],
//       ...actionFn(...any)
//     })
//     return accumulator
//   },
//   {},
//   [
//     ...[
//       'TOGGLE_TIMER',
//     ].map(actionType => (
//       [actionType, timer => ({timer})]
//     )),
//     ['EDIT_TIMER_PROPERTY', (timer, property, value) => ({timer, property, value})]
//   ]
// )

// export const {
//   toggleTimer,
//   editTimerProperty
// } = simpleActions


export const toggleTimer = timer => ({
  type: actionTypes.TOGGLE_TIMER,
  timer
})

export const resetTimer = timer => ({
  type: actionTypes.RESET_TIMER,
  timer
})

export const pauseTimer = timer => ({
  type: actionTypes.PAUSE_TIMER,
  timer
})

export const duplicateTimer = timer => ({
  type: actionTypes.DUPLICATE_TIMER,
  timer
})

export const deleteTimer = timer => ({
  type: actionTypes.DELETE_TIMER,
  timer
})

export const editTimerProperty = (timer, property, value) => ({
  type: actionTypes.EDIT_TIMER_PROPERTY,
  timer,
  property,
  value
})

export const toggleTimerProperty = (timer, property) => ({
  type: actionTypes.TOGGLE_TIMER_PROPERTY,
  timer,
  property
})

export const decrementTimerDurationRemaining = timer => ({
  type: actionTypes.DECREMENT_TIMER_DURATION_REMAINING,
  timer
})
