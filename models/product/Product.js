const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  category: {
    type: String,
    required: true
  },
  productPhotoArray: {
    type: Array,
    required: true
  },
  keywords: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: String,
    default: ""
  },
  surName: {
    type: String,
    default: ""
  },
  securityNumber: {
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
  shippingOption: {
    type: String,
    default: ""
  }
});

ProductSchema.statics.getLatest = function (params, callback) {
  const Product = this;

  if (params.keywords) {
    const keywordsArr = params.keywords.replace('.', '').replace('!', '').replace('?', '').replace('-', ' ').split(" ");

    if (params.category != "Tüm Ürünler") {
      Product
        .find({keywords: {$all: keywordsArr}, category: params.category})
        .sort({"createdAt": -1})
        .then(products => {
          if (products) return callback(null, products);
          
          return callback(true);
        })
        .catch(err => {
          callback(err);
        });
    } else {
      Product
        .find({keywords: {$all: keywordsArr}})
        .sort({"createdAt": -1})
        .then(products => {
          if (products) return callback(null, products);
          
          return callback(true);
        })
        .catch(err => {
          callback(err);
        });
    }
  } else {
    if (params.category != "Tüm Ürünler") {
      Product
        .find({category: params.category})
        .sort({"createdAt": -1})
        .then((products) => {
          if (products) return callback(null, products);
          
          return callback(true);
        })
        .catch(err => {
          callback(err);
        });
    } else {
      Product
        .find()
        .sort({"createdAtSecond": -1})
        .then(products => {
          if (products) return callback(null, products);
          
          return callback(true);
        })
        .catch(err => {
          callback(err);
        });
    }
  }
};

module.exports = mongoose.model('Product', ProductSchema);
