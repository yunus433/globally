const async = require('async');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Category = require('../../../models/category/Category');

const uploadPhoto = require('../../../utils/uploadPhoto');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res, next) => {
  const productPhotoNameArray = req.body.productPhotoNameArray.split(",").filter(each => each.name && each.size);

  async.times(
    productPhotoNameArray.length,
    (time, next) => uploadPhoto(productPhotoNameArray[time].name, productPhotoNameArray[time].size, (err, location) => next(err, location)),
    (err, productPhotoArray) => {
      if (err) return res.redirect('/admin');

      if (!productPhotoArray.length)
        productPhotoArray.push("https://ceoyesilyurt.s3.eu-central-1.amazonaws.com/defaultProductPicture.png");

      const productSizeArray = req.body.sizelist.split('/').map(each => each.trim());
      const productPriceArray = req.body.pricelist.split('/').map(each => each.trim());

      if (productSizeArray.length != productPriceArray.length)
        return res.redirect('/admin');

      Category.findById(mongoose.Types.ObjectId(req.body.category), (err, category) => {
        if (err) return res.redirect('/admin/products');
      
        async.times(
          productSizeArray.length,
          (time, next) => {
            const newProductData = {
              category: category._id,
              categoryName: category.name,
              generalCategory: category.category,
              name: req.body.name + " " + productSizeArray[time],
              type: req.body.type,
              description: req.body.description,
              price: productPriceArray[time],
              productPhotoArray,
              keywords: (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
              isDolar: req.body.isDolar ? true : false
            };
        
            const newProduct = new Product(newProductData);
          
            newProduct.save((err, product) => {
              if (err) return next(err);
          
              Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.category), {$push: {
                products: product._id
              }}, {}, err => {
                if (err) return next(err);
        
                Product.collection.createIndex({ createdAt: 1 }, err => next(err));
              });
            });
          },
          err => {
            if (err) return res.redirect('/admin');
  
            return res.redirect('/admin/products');
          }
        );
      });  
    }
  );
};
