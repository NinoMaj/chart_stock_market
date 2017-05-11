// @flow

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_SERVER_STOCKS,
  IO_CLIENT_STOCKS,
} from '../shared/config'

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    console.log('[socket.io] A client connected.')

    socket.on(IO_CLIENT_STOCKS, (stocks) => {
      console.log(`[socket.io] Stocks recieved on server: ${stocks}`)
      socket.broadcast.emit(IO_SERVER_STOCKS, stocks)
    })

    socket.on(IO_DISCONNECT, () => {
      console.log('[socket.io] A client disconnected.')
    })
  })
}
/* eslint-enable no-console */

export default setUpSocket
