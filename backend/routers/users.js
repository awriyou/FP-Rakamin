const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
  const userList = await User.find().select('-passwordHash'); //! umpetin password

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    return res.status(404).json({
      message: 'The user with the id input from you is not found',
    });
  }
  res.status(200).send(user);
});

//? API ini digunakan kalo pengen ambil data tertentu nya saja biasanya untuk admin.
// router.get('/admin', async (req, res) => {
//   const userList = await User.find().select('name phone email');

//   if (!userList) {
//     res.status(500).json({ success: false });
//   }
//   res.send(userList);
// });

router.post('/', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    province: req.body.province,
  });
  user = await user.save();

  if (!user) {
    return res.status(404).send('The User cannot be created');
  }

  res.send(user);
});


router.post('/login', async (req,res) =>{
  const user = await User.findOne({email: req.body.email})
  const secret = process.env.secret

  if(!user){
    return res.status(400).send('The User not found')
  }

  if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
    const token = jwt.sign(
      {
        userId: user.id
      }, secret, {
        expiresIn : '1d'
      }
    )
    res.status(200).send({user: user.email, token: token})
  }else{
    res.status(400).send('password is wrong')
  }

})

module.exports = router;
