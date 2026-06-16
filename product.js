const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [String], // تحويل إلى مصفوفة لدعم روابط صور متعددة
  colors: [String], // إضافة مصفوفة للألوان
  sizes: [String]   // إضافة مصفوفة للمقاسات
});

module.exports = mongoose.model('Product', productSchema);