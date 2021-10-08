import { isChildOfRefElement, RefElement } from '../helpers/blurDetector.helper'
import { safeAssign } from '@reduxjs/toolkit/dist/query/tsHelpers'

type Handler = (event: Event) => void
type Options = {
  isKeepAlive: boolean
  triggerOnClick: boolean
}
type Listener = {
  refElement: RefElement
  handler: Handler
  options: Options
}
type IsResolved = boolean

let isClickOutsideEventListenerSet = false

const OptionDefault: Options = {
  isKeepAlive: false,
  triggerOnClick: true,
}

const listeners: Set<Listener> = new Set()

const resolver = (
  event: MouseEvent,
  refElement: RefElement,
  handler: Handler
): IsResolved => {
  if (isChildOfRefElement(refElement, event.target as Node)) {
    return false
  }

  handler(event)
  return true
}

const handlerWrapper = (event: MouseEvent) => {
  listeners.forEach((listener) => {
    if (listener.options.triggerOnClick) {
      listener.options.triggerOnClick = false
      return
    }

    const { refElement, handler } = listener
    const isResolved = resolver(event, refElement, handler)

    if (isResolved && !listener.options.isKeepAlive) {
      listeners.delete(listener)
    }
  })

  if (listeners.size === 0) {
    document.removeEventListener('click', handlerWrapper)
    isClickOutsideEventListenerSet = false
  }
}

const blurDetector = (
  refElement: RefElement,
  handler: Handler,
  options: Partial<Options> = {}
) => {
  if (!isClickOutsideEventListenerSet) {
    document.addEventListener('click', handlerWrapper)
    isClickOutsideEventListenerSet = true
  }

  listeners.add({
    refElement,
    handler,
    options: { ...OptionDefault, ...options },
  })
}

export { blurDetector }
