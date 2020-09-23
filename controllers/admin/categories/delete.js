const async = require('async');
const mongoose = require('mongoose');

const Category = require('../../../models/category/Category');
const Product = require('../../../models/product/Product');

const deletePhoto = require('../../../utils/deletePhoto');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Category.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), (err, category) => {
    if (err) return res.redirect('/admin');

    deletePhoto(category.profilePhoto, err => {
      if (err) return res.redirect('/admin');

      async.times(
        category.products.length,
        (time, next) => {
          Product.findByIdAndDelete(mongoose.Types.ObjectId(category.products[time]), (err, product) => {
            if (err) next(err);

            if (!product.profilePhotoArray || !product.profilePhotoArray.length)
              return next(null);

            async.times(
              product.profilePhotoArray.length,
              (time, next) => {
                if (product.profilePhotoArray[time] == "https://ceoyesilyurt.s3.eu-central-1.amazonaws.com/defaultProductPicture.png")
                  return next(null);
                
                deletePhoto(product.profilePhotoArray[time], err => next(null));
              },
              err => next(err)
            );
          })
        },
        err => {
          if (err) return res.redirect('/admin');

          return res.redirect('/admin/categories');
        }
      )
    })
  })
}
