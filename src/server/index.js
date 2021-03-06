// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import setUpSocket from './socket'
import mongoose from 'mongoose'
require('popper.js/dist/umd/popper');

import routing from './routing'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { isProd } from '../shared/util'

// require('./models').connect('mongodb://localhost/stocks')
require('./models').connect(process.env.MONGODB_URI)

const app = express()

// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`)
})
