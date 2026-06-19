const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  colorImages: [String],
  colors: [String],
  sizes: [String],
  category: String,
  isBestSeller: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
