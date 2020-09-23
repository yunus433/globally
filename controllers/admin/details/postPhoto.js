const fs = require('fs');
const mongoose = require('mongoose')

const Product = require('../../../models/product/Product');

const uploadPhoto = require('../../../utils/uploadPhoto');

module.exports = (req, res) => {
  if (!req.file || !req.file.filename)
    return res.sendStatus(500);

  uploadPhoto(req.file.filename, req.file.size, (err, location) => {
    if (err) return res.sendStatus(500);

    Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), { $push: {
      productPhotoArray: location
    }}, err => {
      if (err) return res.sendStatus(500);

      fs.unlink("./public/res/uploads/" + req.file.filename, err => {
        if (err) res.sendStatus(500);

        res.write(location);
        res.end();
      });
    });
  });
};
