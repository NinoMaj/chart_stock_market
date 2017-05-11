// @flow

export const HOME_PAGE_ROUTE = '/'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

export const getStocksEndpointRoute = () => `/api/stocks`
export const addStockEndpointRoute = (string: ?string) => `/api/stocks/${string || ''}`
export const deleteStockEndpointRoute = (string: ?string) => `/api/stocks/${string || ''}`
