const categoriesRoutes = require('./categoriesRoute')
const productsRoutes = require('./productsRoute')
const usersRoutes = require('./usersRoute');
const ordersRoutes = require('./ordersRoute')
const express = require('express');
const router = express.Router();
require('dotenv/config');
const api = process.env.API_URL || '/api/v1'


router.use(`${api}/categories`, categoriesRoutes);
router.use(`${api}/products`, productsRoutes);
router.use(`${api}/users`, usersRoutes);
router.use(`${api}/orders`, ordersRoutes);


module.exports = router