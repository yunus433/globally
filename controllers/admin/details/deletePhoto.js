const mongoose = require('mongoose');

const Product = require("../../../models/product/Product");

module.exports = (req, res) => {
  if (req.body.photo) {
    req.cloudinary.v2.uploader.destroy(
      `globally/product_images/${req.body.photo}`,
      err => {
        if (err) return res.sendStatus(500);

        Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$pull: {
          "productPhotoArray": req.body.photo
        }}, (err) => {
          if (err) return res.sendStatus(500);
          res.sendStatus(200);
        });
      }
    );
  } else {
    res.sendStatus(500);
  };
};