import mongoose from 'mongoose'

const StockSchema = new mongoose.Schema({
  id: { type: Number },
  stocks: {
    type: [String],
    index: { unique: true }
  }
});

module.exports = mongoose.model('Stock', StockSchema);