const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]; //!digunakan untuk cek extension file yang diupload sama atau tidak spt FILE_TYPE_MAP
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    // cb(null, fileName + '-' + Date.now);
    cb(null, `${fileName}-${Date.now()}.${extension}`); //save to upload folder
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  const productsList = await Product.find(); // ! .select('name -_id richDescription') select disini saya gunain sebagai filter apa aja yang mau diambil

  if (!productsList) {
    res.status(500).json({ success: false });
  }
  res.send(productsList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category'); //!populate disini saya gunakan sebagai JOIN untuk menampilkan data dari table category

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
  //?blok ini untuk mastiin ada category nya apa nggak
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send('Invalid Category');
  }
  //?===

  const file = req.file;
  if (!file) {
    return res.status(400).send('No Image in the Request');
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`, //"http://localhost:3000/public/upload/image-1234234"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    return res.status(500).send('The Product cannot be created');
  }
  res.send(product);
});

router.put('/:id', async (req, res) => {
  //?Blok ini digunakan untuk memvalidasi id, kalo gunain mongo tanpa pakai promise
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Invalid Product ID');
  }
  //?=====
  //?blok ini untuk mastiin ada category nya apa nggak
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send('Invalid Category');
  }
  //?===

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true, //?Kalo mau yang direturn data baru
    }
  );
  if (!product) {
    return res.status(404).send('The Product cannot be updated');
  }

  res.send(product);
});

router.delete('/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: 'The Product was deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//! Mongo punya fungsi buat admin, contohnya dibawah ini, buat menghitung total product yang ada(rata-rata return nya cuma angka aja, barngkali butuh)
router.get(`/get/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    res.json({
      count: productCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//! ini contoh buat jumbotron, kali kita mao otomatis nampilin beberapa data product di homepage
router.get(`/get/featured/:count`, async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count); //! limit disini saya gunakan sebagai batasan featured yang ingin dikeluarkan

    res.send(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//!get data barang berdasarkan category
// router.get(`/`, async (req, res) => {
//   let filter = {}
//   if(req.query.categories){
//     filter = {category: req.query.categories.split(',')}
//   }

//   const productsList = await Product.find(filter).populate('category');

//   if (!productsList) {
//     res.status(500).json({ success: false });
//   }
//   res.send(productsList);
// });

//? untuk menambahkan image lebih dari satu
router.put(
  '/gallery-images/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send('Invalid Product ID');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    //? blok fungsi ini digunakan untuk menyimpan nama filepath menjadi lebih dari satu
    if (files) {
      files.map(file => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }
    //?====
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      {
        new: true, //?Kalo mau yang direturn data baru
      }
    );
    if (!product) {
      return res.status(404).send('The Product cannot be updated');
    }

    res.send(product);
  }
);

module.exports = router;
