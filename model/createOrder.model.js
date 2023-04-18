const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    address: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  });
  
  module.exports = mongoose.model("createOrder", orderSchema);