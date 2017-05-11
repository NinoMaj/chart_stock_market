// @flow

import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  width: 200px;
`

const Loading = () =>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12">
        <Div>
          Loading...
        </Div>
      </div>
    </div>
  </div>

export default Loading
