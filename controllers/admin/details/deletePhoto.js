const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

const deletePhoto = require('../../../utils/deletePhoto');

module.exports = (req, res) => {
  if (req.body.photo) {
    deletePhoto(req.body.photo, err => {
      if (err) return res.sendStatus(500);

      Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$pull: {
        productPhotoArray: req.body.photo
      }}, (err) => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
      });
    });
  } else {
    res.sendStatus(500);
  };
};
