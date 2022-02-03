import { useReducer, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const transitionTime = 400
const threshold = 0.3
const limit = 1.2
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
const smooth = `transform ${transitionTime}ms ease`

const initialCarouselState = {
  offset: 0,
  desired: 0,
  active: 0,
}

function previous(length, current) {
  return (current - 1 + length) % length
}

function next(length, current) {
  return (current + 1) % length
}

function carouselReducer(state, action) {
  switch (action.type) {
    case 'jump':
      return {
        ...state,
        desired: action.desired,
      }
    case 'next':
      return {
        ...state,
        desired: next(action.length, state.active),
      }
    case 'prev':
      return {
        ...state,
        desired: previous(action.length, state.active),
      }
    case 'done':
      return {
        ...state,
        offset: NaN,
        active: state.desired,
      }
    case 'drag':
      return {
        ...state,
        offset: action.offset,
      }
    default:
      return state
  }
}

function swiped(
  delta,
  dispatch,
  length,
  dir,
  container,
) {
  const t = container.clientWidth * threshold
  const d = dir * delta

  if (d >= t) {
    dispatch(dir > 0 ? { type: 'next', length } : { type: 'prev', length })
  } else {
    dispatch({
      type: 'drag',
      offset: 0,
    })
  }
}

export function useCarousel(
  length,
  interval,
) {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState)
  const [container, setContainer] = useState(undefined)

  const { ref, onMouseDown } = useSwipeable({
    onSwiping(e) {
      const sign = e.deltaX > 0 ? -1 : 1
      dispatch({
        type: 'drag',
        offset: sign * Math.min(Math.abs(e.deltaX), limit * container.clientWidth),
      })
    },
    onSwipedLeft(e) {
      swiped(e.deltaX, dispatch, length, 1, container)
    },
    onSwipedRight(e) {
      swiped(e.deltaX, dispatch, length, -1, container)
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  const handlers = {
    onMouseDown,
    ref(container) {
      setContainer(container && container.firstElementChild)
      return ref(container)
    },
  }

  useEffect(() => {
    if (interval > 0) {
      const id = setTimeout(() => dispatch({ type: 'next', length }), interval)
      return () => clearTimeout(id)
    }
  }, [state.offset, state.active, interval, length])

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime)
    return () => clearTimeout(id)
  }, [state.desired])

  const style = {
    transform: 'translateX(0)',
    width: `${100 * (length + 2)}%`,
    left: `-${(state.active + 1) * 100}%`,
  }

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired)
    const pref = Math.sign(state.offset || 0)
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active)
    const shift = (100 * (pref || dir)) / (length + 2)
    style.transition = smooth
    style.transform = `translateX(${shift}%)`
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style.transform = `translateX(${state.offset}px)`
    } else {
      style.transition = elastic
    }
  }

  return [state.active, n => dispatch({ type: 'jump', desired: n }), handlers, style]
}