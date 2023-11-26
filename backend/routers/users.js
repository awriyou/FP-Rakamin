const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash"); //! umpetin password

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    return res.status(404).json({
      message: "The user with the id input from you is not found",
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

router.post("/", async (req, res) => {
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
    return res.status(404).send("The User cannot be created");
  }

  res.send(user);
});

router.put("/:id", async (req, res) => {
  try {
    let photoUrl = "";
    let newPasswordHash;

    // Check if a file is uploaded
    if (req.file && req.file.path) {
      // If yes, upload to Cloudinary
      const photo = await cloudinary.uploader.upload(req.file.path, {
        folder: "/public/users",
        use_filename: true,
        public_id: `${Date.now()}-${req.body.name}-${req.file.originalname}`,
      });

      // Get the uploaded photo URL
      photoUrl = photo.secure_url;
    }

    // Validate old password if updating the password
    if (req.body.newPassword && req.body.newPassword.trim() !== "") {
      const user = await User.findById(req.params.id);
      if (
        !user ||
        !bcrypt.compareSync(req.body.oldPassword, user.passwordHash)
      ) {
        return res.status(401).send("Invalid old password.");
      }

      // Check if the new password matches the confirmation
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res
          .status(400)
          .send("New password and confirmation do not match.");
      }

      // Hash the new password
      newPasswordHash = bcrypt.hashSync(req.body.newPassword, 10);
    }

    // Update user without forcing a photo change
    const updatedFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      province: req.body.province,
      // Use the uploaded photo URL or leave it empty if there's no change
      photo: photoUrl || undefined,
      // Include the new password hash if it exists
      ...(newPasswordHash && { passwordHash: newPasswordHash }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found or cannot be updated.");
    }

    // Log the updated user for debugging
    console.log("Updated User:", updatedUser);

    res.send(updatedUser);
  } catch (err) {
    console.error(err);

    // Log the specific error message for debugging
    console.error("Error Message:", err.message);

    return res
      .status(500)
      .send("Internal Server Error. User could not be updated.");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(400).send("The User not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin, //definiin admin disini agar nanti bisa diatur jwt nya berdasarkan role > jwt.js
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong");
  }
});

router.post("/register", async (req, res) => {
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
    return res.status(404).send("The User cannot be created");
  }

  res.send(user);
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "The User was deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//! Mongo punya fungsi buat admin, contohnya dibawah ini, buat menghitung total user yang ada(rata-rata return nya cuma angka aja, barngkali butuh)
router.get(`/get/count`, async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    res.json({
      count: userCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
