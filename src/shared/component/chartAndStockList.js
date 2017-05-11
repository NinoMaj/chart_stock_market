// @flow

import React from 'react'
import Chart from './chart'
import StockList from './stockList'

type Props = {
  seriesOptions: array,
}

const ChartAndStockList = ({seriesOptions}: Props) => {
  return (
    <div>
      <Chart seriesOptions={seriesOptions}/>
      <StockList seriesOptions={seriesOptions}/>
    </div>
  )
}

export default ChartAndStockList
