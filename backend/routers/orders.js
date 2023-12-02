const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

//untuk menampilkan semua order
router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

//untuk menampilkan order berdasarkan id
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name") //ambil data user-name dari user id di orders
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    }); //ambil data product dari product id yang ada di orderItem, lalu ambil data categori dari category id yang ada di product

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

//untuk menambahkan order untuk user
router.post("/", async (req, res) => {
  try {
    // Check if the orderItems property is an array
    if (!Array.isArray(req.body.orderItems)) {
      return res.status(400).json({ error: "Invalid orderItems format" });
    }

    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const newOrderItem = await OrderItem.create({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        return newOrderItem._id;
      })
    );

    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );

        console.log("Order Item:", orderItem);
        console.log("Product:", orderItem.product);
        console.log("Price:", orderItem.product.price);

        if (!orderItem || !orderItem.product || !orderItem.product.price) {
          console.error("Invalid order item or missing price information");
          // return 0; // atau sesuaikan nilai default jika diperlukan
        }

        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
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
      return res.status(500).json({ error: "Pesanan tidak dapat dibuat" });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

//untuk menambahkan order item
router.post("/orderItems", async (req, res) => {
  try {
    const orderItem = new OrderItem({
      user: req.body.user,
      quantity: req.body.quantity,
      product: req.body.product,
    });

    // Mendapatkan produk dari basis data
    const product = await Product.findById(req.body.product);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Memperbarui countInStock
    product.countInStock -= req.body.quantity;

    // Menyimpan perubahan pada produk
    await product.save();

    // Menyimpan OrderItem
    const newOrderItem = await orderItem.save();

    if (!newOrderItem) {
      return res.status(400).send("Failed to create OrderItem");
    }

    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//untuk membatalkan order item
// Untuk menghapus order item
router.delete("/orderItems/:orderItemId", async (req, res) => {
  try {
    const orderItemId = req.params.orderItemId;

    // Mencari OrderItem berdasarkan ID
    const orderItem = await OrderItem.findById(orderItemId);

    if (!orderItem) {
      return res.status(404).send("OrderItem not found");
    }

    // Mendapatkan produk dari basis data
    const product = await Product.findById(orderItem.product);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Mengembalikan countInStock ke nilai semula
    product.countInStock += orderItem.quantity;

    // Menyimpan perubahan pada produk
    await product.save();

    // Menghapus OrderItem dari basis data
    await OrderItem.findByIdAndDelete(orderItemId);

    res.status(200).send("OrderItem deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Update status sesuai status pengiriman dll
router.put("/:id", async (req, res) => {
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
    return res.status(404).send("The Order cannot be updated");
  }

  res.send(order);
});

//untuk menghapus order berdasarkan id dari parameter
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      // Access the orderItems property and convert it to an array
      const orderItems = Array.isArray(order.orderItems)
        ? order.orderItems
        : [];

        
      // Use Promise.all to wait for all deletions to complete
      await Promise.all(
        orderItems.map(async (orderItemId) => {
          // Assuming orderItemId is the ID of OrderItem
          await OrderItem.findByIdAndDelete(orderItemId);
        })
      );

      return res
        .status(200)
        .json({ success: true, message: "The Order was deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});


//untuk menghitung total sales
router.get("/get/totalSales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }
  res.send({ totalsales: totalSales.pop().totalsales });
});

//untuk menghitung total order per user
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
  const UserOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!UserOrderList) {
    res.status(500).json({ success: false });
  }
  res.send(UserOrderList);
});

module.exports = router;
