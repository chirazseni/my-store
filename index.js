const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Product = require('./product');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// جعل مجلد الصور متاحاً للوصول عبر المتصفح
app.use('/uploads', express.static('uploads'));

// إعدادات Multer لتخزين الصور المرفوعة
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم فريد يعتمد على الوقت
  }
});
const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB متصلة!'))
  .catch(err => console.log('خطأ في الاتصال:', err));

// جلب كل المنتجات
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// إضافة منتج جديد مع رفع صور متعددة (حد أقصى 5 صور)
app.post('/products', upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, description, colors, sizes } = req.body;

    // تحويل المصفوفات القادمة كنصوص (JSON) إلى مصفوفات حقيقية
    const parsedColors = colors ? JSON.parse(colors) : [];
    const parsedSizes = sizes ? JSON.parse(sizes) : [];

    // إنشاء روابط كاملة للصور المرفوعة
    const imageUrls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);

    const product = new Product({
      name,
      price,
      description,
      images: imageUrls,
      colors: parsedColors,
      sizes: parsedSizes
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// حذف منتج
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'تم الحذف!' });
});

app.listen(3000, () => {
  console.log('Sيرفر شغال على http://localhost:3000');
}); 