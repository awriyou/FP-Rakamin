const usersControllers = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.get(`/`, usersControllers.getUsers);

router.get('/:id', usersControllers.getUserById);

//? API ini digunakan kalo pengen ambil data tertentu nya saja biasanya untuk admin.
// router.get('/admin', async (req, res) => {
//   const userList = await User.find().select('name phone email');

//   if (!userList) {
//     res.status(500).json({ success: false });
//   }
//   res.send(userList);
// });

router.post('/', usersControllers.uploadOptions.single('photo'),usersControllers.createUser);

router.post('/login', usersControllers.login);

router.post('/register', usersControllers.register);

router.put('/:id', usersControllers.uploadOptions.single('photo'),usersControllers.updateUser);


router.delete('/:id', usersControllers.deleteUser);


//! Mongo punya fungsi buat admin, contohnya dibawah ini, buat menghitung total user yang ada(rata-rata return nya cuma angka aja, barngkali butuh)
router.get(`/get/count`, usersControllers.countUsers);


module.exports = router;
