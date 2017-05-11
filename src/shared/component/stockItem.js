// @flow

import React from 'react'
import { connect } from 'react-redux'
import {deleteStockAsync} from '../action/chart_action'
import styled from 'styled-components'

type Props = {
  item: string,
  // handleDeleteItem: Function,
}

const Div = styled.div`
  border: 1px solid #dddddd;
  background: #eeeeee;
  box-shadow: 0 5px 3px -3px #777;
  padding-left: 10px;
  margin: 2%;
  border-radius: 2px;
  flex-basis: 200px;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  position: relative;

  &:hover  {
    background: #dddddd;
  }
`

const Link = styled.a`
  display: inline-block;
  width: 85%;
  height: 100%;
  text-decoration: none;
  color: black;

  &:link, &:hover {
    text-decoration: none;
    color: black;
  }
`

const DeleteBtn = styled.span`
  text-align: center;
  margin-left: 5%;

    &:hover  {
    color: #cc0000;
    cursor: pointer;
  }
`

class StockItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDeleteItem() {
    this.props.deleteStockAsync(this.props.item)
  }

  render() {
    return (
      <Div>
        <Link href={'https://www.google.com/search?q=' + this.props.item + 'stock'} target="_blank">{this.props.item}</Link>
        <DeleteBtn onClick={() => this.handleDeleteItem()}>x</DeleteBtn>
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteStockAsync: (removeStock) => { dispatch(deleteStockAsync(removeStock)) },
})

export default connect(null, mapDispatchToProps)(StockItem)
