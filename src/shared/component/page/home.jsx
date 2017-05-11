// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Chart from '../../container/chart'
import Footer from '../footer'
import { APP_NAME } from '../../config'

const HomePage = () =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 mb-4">{APP_NAME}</h1>
      </div>
    </div>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          <Chart />
        </div>
      </div>
    </div>
    <Footer />
  </div>

export default HomePage
