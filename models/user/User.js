const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  password_reset: {
    type: String,
    default: null
  },
  password_reset_exp_date: {
    type: String,
    default: null
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  braintreeCustomerID: {
    type: String,
    default: ""
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ""
  },
  surName: {
    type: String,
    default: ""
  },
  securityNuber: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  company: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  town: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  currentProducts: {
    type: Array,
    default: []
  }
});

UserSchema.pre('save', hashPassword);

UserSchema.statics.findUser = function (email, password, callback) {
  let User = this;

  User.findOne({email}).then(user => { 
    if (!user) {
        return callback(true);
    }

    verifyPassword(password, user.password, (res) => {
      if (res) return callback(null, user);
      
      return callback(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
