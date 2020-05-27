const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

const ProductSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  type: {
    type: String,
    default: "adet"
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  category: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  generalCategory: {
    type: String,
    default: ""
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
  isDolar: {
    type: Boolean,
    default: false
  },
  onWindow: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: String,
    default: ""
  },
  saleAmount: {
    type: String,
    default: ""
  }
});

ProductSchema.statics.getLatest = function (params, callback) {
  const Product = this;

  const keywordsArr = params.keywords ? (engName(params.keywords).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+") : null;

  if (keywordsArr) {
    Product
      .find({
        keywords: {$all: keywordsArr},
        generalCategory: (params.generalCategory ? params.generalCategory : {$nin: ['all_products']}),
        category: (params.category ? params.category : {$nin: ['all_products']})
      })
      .sort({"createdAt": 1})
      .then(products => {
        if (products) return callback(null, products);
          
        return callback(true);
      });
  } else {
    Product
      .find({
        generalCategory: (params.generalCategory ? params.generalCategory : {$nin: ['all_products']}),
        category: (params.category ? params.category : {$nin: ['all_products']})
      })
      .sort({"createdAt": 1})
      .then(products => {
        if (products) return callback(null, products);
          
        return callback(true);
      });
  }
};

module.exports = mongoose.model('Product', ProductSchema);
