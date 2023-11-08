const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    rqeuired: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: ''
  },
  postalCode: {
    type: Number,
    default: null
  },
  city: {
    type: String,
    default: ''
  }, 
  province: {
    type: String,
    default: ''
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
