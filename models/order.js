// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  total: { type: Number, required: true },
  user: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);