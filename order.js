const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientName: String,
  clientPhone: String,
  email: String,
  wilaya: String,
  commune: String,
  address: String,
  deliveryType: String,
  items: [Object],
  totalPrice: Number,
  status: { type: String, default: 'En cours' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
