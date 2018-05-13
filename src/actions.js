import Enum from 'es6-enum'

export const actionTypes = new Enum(
  'CREATE_TIMER',
  'TOGGLE_TIMER',
  'RESET_TIMER',
  'PAUSE_TIMER',
  'NAME_TIMER',
  'DUPLICATE_TIMER',
  'DECREMENT_TIMER_DURATION_REMAINING',
  'INCREMENT_TIMER_DURATION_REMAINING'
)

export const createTimer = (id, name, duration) => ({
  type: actionTypes.CREATE_TIMER,
  timer: {
    id,
    name,
    duration,
    durationRemaining: duration,
    running: false
  }
})

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

export const nameTimer = (timer, name) => ({
  type: actionTypes.NAME_TIMER,
  timer,
  name
})

export const duplicateTimer = timer => ({
  type: actionTypes.DUPLICATE_TIMER,
  timer
})

export const decrementTimerDurationRemaining = timer => ({
  type: actionTypes.DECREMENT_TIMER_DURATION_REMAINING,
  timer
})

export const incrementTimerDurationRemaining = timer => ({
  type: actionTypes.INCREMENT_TIMER_DURATION_REMAINING,
  timer
})
