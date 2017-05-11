// @flow

import React from 'react'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'

type Props = {
  seriesOptions: array,
}

const Chart = ({ seriesOptions }: Props) => {

  var config = {
    rangeSelector: {
      selected: 4
    },
    title: {
      text: 'Stock Prices'
    },
    navigator: {
      enabled: true
    },
    series: seriesOptions
  }
  
  let element = React.createElement(ReactHighstock, { config: config })
  const renderElement = (seriesOptions.length === 0) ? false : true;
      return (
        <div style={ {margin: '0px auto', padding: '20px', maxWidth: '800px'} }>
          {renderElement && element}
        </div>
      )
}

export default Chart
