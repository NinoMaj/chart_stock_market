import {
  ADD_STOCK,
  STOCKS_ASYNC_REQUEST,
  STOCKS_ASYNC_SUCCESS,
  STOCKS_ASYNC_FAILURE
} from '../action/chart_action'

// import fetchStocks from '../../server/api/getStocks'

  const initialState = {}

  const chartReducer = (state = initialState, action: { type: string, payload: object }) => {
    // console.log('in chartReducer, state:', state)
    // console.log('in chartReducer, action:', action)
    switch (action.type) {
      case ADD_STOCK:
        return Object.assign({}, { stocks: [...state.stocks, action.payload] })
      case STOCKS_ASYNC_REQUEST:
        return Object.assign({}, state, { loading: true })
      case STOCKS_ASYNC_SUCCESS:
        return Object.assign({}, state, { stocks: action.payload }, { loading: false } )
      case STOCKS_ASYNC_FAILURE:
        return Object.assign({}, state, { error: true })
      default:
        return state
    }
  }

export default chartReducer
