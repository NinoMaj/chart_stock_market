// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import chartReducer from '../shared/reducer/chart_reducer'

const initStore = (plainPartialState: ?Object) => {
  // console.log('plainPartialState 456', plainPartialState.stocks)
  const preloadedState = plainPartialState ? {} : undefined
  if (plainPartialState) {
    // flow-disable-next-line
    preloadedState.data = Object.assign({}, chartReducer(undefined, {}), plainPartialState.stocks)
  }
  // console.log('preloadedState', preloadedState)
  return createStore(combineReducers(
    {
      data: chartReducer,
    }
  ),
    preloadedState, applyMiddleware(thunkMiddleware))
}

export default initStore
