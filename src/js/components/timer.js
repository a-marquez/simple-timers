import React from 'react'
import {X, Star, Bell, BellOff, Play, Pause, Copy, RotateCw, Edit2} from 'react-feather'

const Timer = ({timer, ...dispatches}) => {
  let seconds = timer.durationRemaining/1000
  let minutes = Math.floor(seconds/60)
  let hours = Math.floor(minutes/60)

  ;[seconds, minutes] = [seconds, minutes].map(measure => (
    measure = measure % 60
  ))

  ;[seconds, minutes, hours] = [seconds, minutes, hours].map(measure => (
    measure < 10 ? `0${measure}` : measure
  ))

  const bindTimer = fn => event => {
    event.stopPropagation();
    fn(timer)
  }

  return (
    <div className='timer'>
      <header className='timer__control'>
        <button onClick={bindTimer(dispatches.toggleFavourite)}>
          <Star fill={timer.favourite ? 'gold' : 'none'}/>
        </button>
        <button onClick={bindTimer(dispatches.toggleNotification)}>
          {timer.notification ?
            <Bell/> :
            <BellOff/>
          }
        </button>
        <button onClick={bindTimer(dispatches.deleteTimer)}>
          <X className='timer__control__x'/>
        </button>
      </header>

      <section className='timer__body' onClick={bindTimer(dispatches.toggleSelected)}>
        <header className='timer__header'>{timer.name}</header>
        <div>
          <input className='timer__duration' type='range'/>
        </div>
        <div className='timer__body__body'>
          <div className='timer__counter'>
            <span className='timer__counter__digit'>{hours}</span>
            <span className='timer__counter__label'>H</span>
            <span className='timer__counter__digit'>{minutes}</span>
            <span className='timer__counter__label'>M</span>
            <span className='timer__counter__digit'>{seconds}</span>
            <span className='timer__counter__label'>S</span>
          </div>
          <div className='grid'>
            <button onClick={bindTimer(dispatches.toggleTimer)} className='timer__toggle'>
              {timer.running ?
                <Pause/> :
                <Play/>
              }
            </button>
          </div>
        </div>
      </section>

      <footer className='timer__control'>
        <button onClick={bindTimer(dispatches.duplicateTimer)}>
          <Copy/>
        </button>
        <button onClick={bindTimer(dispatches.resetTimer)}>
          <RotateCw/>
        </button>
        <button>
          <Edit2/>
        </button>
      </footer>
    </div>
  )
}

export default Timer
