// @flow

import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import io from 'socket.io-client'
const socket = io(`http://localhost:8000`)

import { getStocksAsync } from '../action/chart_action'
import { addStockAsync } from '../action/chart_action'
import ChartAndStockList from '../component/chartAndStockList'
import Modal from '../component/modal'
import Loading from '../component/loading'
import AddStock from './add-stock'
import {
  IO_SERVER_STOCKS,
  IO_CLIENT_STOCKS,
} from '../config'

class ChartContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: this.props.data.stocks.loading || false,
      value: '',
      seriesOptions: [],
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleNewStock = this.handleNewStock.bind(this)
  }

  componentDidMount() {
    this.getStockData(this.props.data.stocks)
  }

  componentWillReceiveProps(nextProps) {  
    socket.on(IO_SERVER_STOCKS, (stocks) => {
      this.getStockData(stocks)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.stocks.length !== prevProps.data.stocks.length) {
      this.setState({
        loaded: false,
      })
      this.getStockData(this.props.data.stocks)
      socket.emit(IO_CLIENT_STOCKS, this.props.data.stocks)
    }
  }

  getStockData(stocks) {
    const this2 = this;
    let seriesOptionsTemp = []
    let seriesCounter = 0
    if (stocks.length !== 0) {
      stocks.forEach((name, i) => {
        $.ajax({
          url: 'http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + name + '&apikey=' + '9RU0',
          type: 'GET',
          dataType: 'json',
          success: function success(response) {
            let data = []
            let responseArray = []
            for (let key in response["Time Series (Daily)"]) {
              responseArray.push(key)
            }
            responseArray.sort()
            for (let i = 0; i < responseArray.length; i++) {
              data.push(
                [+new Date(responseArray[i]),
                Number(response["Time Series (Daily)"][responseArray[i]]["4. close"])
                ])
            }
            seriesOptionsTemp[i] = {
              name,
              data,
              tooltip: {
                valueDecimals: 2
              }
            }
            seriesCounter += 1

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            if (seriesCounter === stocks.length) {
              this2.setState({
                loaded: true,
                seriesOptions: seriesOptionsTemp
              })
            }
          },
          error: function () { console.log('Error!') },
          beforeSend: setHeader
        })
      }) 
    } else {
      this.setState({
        loaded: true,
        seriesOptions: [],
      })
    }

    function setHeader(xhr) {
      // xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
      // xhr.setRequestHeader('Access-Control-Allow-Credentials', true)
      // xhr.setRequestHeader("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With")
      // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST")
    }
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleNewStock(newStock) {
    $.getJSON('http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + newStock + '&apikey=' + '9RU0', response => {
      if (response["Meta Data"]) {
        this.props.addStockAsync(newStock)
      } else {
        console.log('Stock not found')
        $('.myModal').modal()
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.loaded ? (
          <div>
            <AddStock getStock={this.handleNewStock} />
            <ChartAndStockList seriesOptions={this.state.seriesOptions} />
          </div>
        ) : (
            <Loading />
          )}
        <Modal />
      </div>
    )

  }
}

const mapStateToProps = state => ({
  data: state.data,
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(requestChart('Hello!')) },
  addStockAsync: (newStock) => { dispatch(addStockAsync(newStock)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer)
