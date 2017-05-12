// @flow

export const homePage = () => 
  new Promise((resolve, reject) => {
    const Stock = require('mongoose').model('Stock')
    Stock.find({}, (stockErr, data) => {
      if (stockErr) {
        // console.log('hp1', stockErr)
        reject(stockErr)
      } else if (data[0]) {
        console.log('hp2', data)
        resolve(data[0].stocks)
      } else {
        // console.log('hp3', stocks)
        resolve([])
      }
    })
  })
