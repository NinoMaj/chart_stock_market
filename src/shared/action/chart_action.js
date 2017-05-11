// @flow

import 'isomorphic-fetch'

import { getStocksEndpointRoute } from '../routes'
import { addStockEndpointRoute } from '../routes'
import { deleteStockEndpointRoute } from '../routes'

export const ADD_STOCK = 'ADD_STOCK'
export const STOCKS_ASYNC_REQUEST = 'STOCKS_ASYNC_REQUEST'
export const STOCKS_ASYNC_SUCCESS = 'STOCKS_ASYNC_SUCCESS'
export const STOCKS_ASYNC_FAILURE = 'STOCKS_ASYNC_FAILURE'

// export const addStock = (payload: any) => ({
//   type: ADD_STOCK,
//   payload,
// })

export const stocksAsyncRequest = (payload: any) => ({
  type: STOCKS_ASYNC_REQUEST,
  payload,
})

export const stocksAsyncSuccess = (payload: any) => ({
  type: STOCKS_ASYNC_SUCCESS,
  payload,
})

export const stocksAsyncFailure = (payload: any) => ({
  type: STOCKS_ASYNC_FAILURE,
  payload,
})

export const addStockAsync = (newStock: string) => (dispatch: Function) => {
  dispatch(stocksAsyncRequest())
  // console.log('temp', addStockEndpointRoute(newStock))
  return fetch(addStockEndpointRoute(newStock), { method: 'POST' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      // console.log('res in addStockAsync', res)
      return res.json()
    })
    .then((stocks) => {
      // console.log('stocks in stockAsync addStock', stocks)
      if (!stocks) throw Error('No message received')
      dispatch(stocksAsyncSuccess(stocks))
    })
    .catch((error) => {
      console.log('catch in stockAsync in addStockAsync')
      dispatch(stocksAsyncFailure(error))
    })
}

export const getStocksAsync = () => (dispatch: Function) => {
  dispatch(stocksAsyncRequest())
  return fetch(getStocksEndpointRoute(), { method: 'GET' })
    .then((res) => {
      console.log('res in getStockAsync', res)      
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((stocks) => {
      console.log('stocks in stockAsync getStockAsync', stocks)
      if (!stocks) throw Error('No message received')
      dispatch(stocksAsyncSuccess(stocks))
    })
    .catch((error) => {
      console.log('catch in stockAsync in getStockAsync')
      dispatch(stocksAsyncFailure(error))
    })
}

export const deleteStockAsync = (removeStock: string) => (dispatch: Function) => {
  dispatch(stocksAsyncRequest())
  // console.log('temp', addStockEndpointRoute(newStock))
  return fetch(deleteStockEndpointRoute(removeStock), { method: 'DELETE' })
    .then((res) => {
      console.log('res in addStockAsync', res)
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((stocks) => {
      console.log('stocks in stockAsync deleteStock', stocks)
      if (!stocks) throw Error('No message received')
      dispatch(stocksAsyncSuccess(stocks))
    })
    .catch((error) => {
      console.log('catch in stockAsync in deleteStockAsync', error)
      dispatch(stocksAsyncFailure(error))
    })
}