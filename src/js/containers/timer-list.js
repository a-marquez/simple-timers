import {map} from 'ramda'
import React from 'react'
import {connect} from 'react-redux'

import Timer from '../components/timer'
import {toggleTimer, resetTimer, duplicateTimer, deleteTimer, toggleTimerProperty} from '../actions'

const TimerList = ({timers, ...dispatches}) => (
  Object.values(timers).sort(timer => !timer.favourite).map(timer => (
    <Timer key={timer.id} {...{timer}} {...dispatches}/>
  ))
)

const mapState = state => state

const mapDispatch = dispatch => ({
  ...map(
    fn => timer => dispatch(fn(timer)),
    {
      toggleTimer,
      resetTimer,
      duplicateTimer,
      deleteTimer
    }
  ),
  toggleFavourite: timer => dispatch(toggleTimerProperty(timer, 'favourite')),
  toggleNotification: timer => dispatch(toggleTimerProperty(timer, 'notification')),
  toggleSelected: timer => dispatch(toggleTimerProperty(timer, 'selected'))
})

export default connect(
  mapState,
  mapDispatch
)(TimerList)
