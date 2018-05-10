import Enum from 'es6-enum'

export const actionTypes = new Enum(
  'CREATE_TIMER',
  'TOGGLE_TIMER',
  'RESET_TIMER',
  'DECREMENT_TIMER_DURATION_REMAINING'
)

export const createTimer = (id, label, duration) => ({
  type: actionTypes.CREATE_TIMER,
  timer: {
    id,
    label,
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

export const decrementTimerDurationRemaining = timer => ({
  type: actionTypes.DECREMENT_TIMER_DURATION_REMAINING,
  timer
})
