// @flow

export const WEB_PORT = process.env.PORT || 8080
export const STATIC_PATH = '/public'
export const APP_NAME = 'Charting stocks'

export const WDS_PORT = 7000

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`

export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_SERVER_STOCKS = 'IO_SERVER_STOCKS'
export const IO_CLIENT_STOCKS = 'IO_CLIENT_STOCKS'
