const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate('user', 'name')
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name') //ambil data user-name dari user id di orders
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: 'category' },
    }); //ambil data product dari product id yang ada di orderItem, lalu ambil data categori dari category id yang ada di product

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

router.post('/', async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;
  //data product dan qty disimpan dulu, lalu masukan ke Order yaitu detail order

  //! Menghitung total price agar tidak perlu dihitung di fe lagi
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    province: req.body.province,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) {
    return res.status(404).send('The order cannot be created');
  }

  res.send(order);
});

//Update status sesuai status pengiriman dll
router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true, //?Kalo mau yang direturn datab aru
    }
  );
  if (!order) {
    return res.status(404).send('The Order cannot be updated');
  }

  res.send(order);
});

router.delete('/:id', (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await orderItem.findByIdAndDelete(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: 'The Order was deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Order not found' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get('/get/totalSales', async(req, res)=> {
  const totalSales = await Order.aggregate([
    {$group : { _id: null, totalsales : {$sum : '$totalPrice'}}}
  ])
  if(!totalSales){
    return res.status(400).send('The order sales cannot be generated')
  }
  res.send({totalsales: totalSales.pop().totalsales})
})

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    res.json({
      count: orderCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//! routing ini digunakan untuk mendapatkan orderlist berdasarkan user nya
router.get(`/get/userorders/:userid`, async (req, res) => {
  const UserOrderList = await Order.find({user: req.params.userid})
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: 'category' },
    })
    .sort({ dateOrdered: -1 });

  if (!UserOrderList) {
    res.status(500).json({ success: false });
  }
  res.send(UserOrderList);
});


module.exports = router;
