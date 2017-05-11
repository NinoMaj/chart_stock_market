// @flow

import {
  homePage,
} from './controller'

import {
  HOME_PAGE_ROUTE,
  stocksEndpointRoute,
} from '../shared/routes'

import renderApp from './render-app'

export default (app: Object) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    homePage()
      .then((data) => {
        res.send(renderApp(req.url, {stocks: {stocks: data}}))
    }).catch((error) => {
        console.log(error)
    })
  })

  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })

  const api = require('./api/stocks.js');
  app.use('/api', api);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
