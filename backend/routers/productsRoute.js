const productController= require('../controllers/productsControllers')
const express = require('express');
const router = express.Router();

router.get(`/`, productController.getProducts);

router.get(`/:id`, productController.getProductById);

router.post(`/`, productController.createProduct);

router.put('/:id', productController.updateProduct);

//! Mongo punya fungsi buat admin, contohnya dibawah ini, buat menghitung total product yang ada(rata-rata return nya cuma angka aja, barngkali butuh)
router.get(`/get/count`, productController.countProducts);

//! ini contoh buat jumbotron, kali kita mao otomatis nampilin beberapa data product di homepage
router.get(`/get/featured/:count`, productController.getFeaturedProducts);

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
  '/gallery-images/:id',productController.uploadImages);

module.exports = router;
