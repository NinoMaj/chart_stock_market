const express = require('express');
const router = new express.Router();

router.post('/stocks/:stock', (req, res) => {
  const Stock = require('mongoose').model('Stock')
  Stock.findOneAndUpdate(
    {},
    { $addToSet: { stocks: req.params.stock.toUpperCase() } },
    { safe: true, upsert: true, new: true },
    function (err, data) {
      if (err) {
        console.log('err', err)
        res.status(401).end()
      } else {
        console.log('updated data', data)
        res.status(200).json(data.stocks).end()
      }
    }
  )
});

router.get('/stocks', (req, res) => {
  const Stock = require('mongoose').model('Stock')
  Stock.find({}, (stockErr, data) => {
    if (stockErr) {
      console.log('g1', stockErr)
      res.status(401).end(stockErr)
    } else if (data[0].stocks.length !== 0) {
      console.log('g2', stocks.length)
      res.status(200).json(data.stocks).end()
    } else {
      console.log('g3', stocks)
      res.status(200).json([]).end()
    }
  })
})

router.delete('/stocks/:stock', (req, res) => {
  const Stock = require('mongoose').model('Stock')
    Stock.findOneAndUpdate(
    {},
    { $pull: { stocks: req.params.stock } },
    function (err, data) {
      if (err) {
        console.log('err', err)
        res.status(401).end()
      } else {
        const newStockList = data.stocks.filter(stock => stock !== req.params.stock)
        console.log('newStockList', newStockList)
        res.status(200).json(newStockList).end()
      }
    }
  )
})

module.exports = router;
