// @flow

import React from 'react'
import StockItem from './stockItem'
import styled from 'styled-components'

type Props = {
  seriesOptions: array,
}

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  
`

const StockList = ({seriesOptions}: Props) => {
  
  return (
    <FlexContainer>
      {
        seriesOptions.map(item => {
          return(<StockItem item={item.name} key={item.name} />)
        })
      }
    </FlexContainer>
  )
}

export default StockList
