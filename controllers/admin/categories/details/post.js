const mongoose = require('mongoose');
const fs = require('fs');

const Category = require('../../../../models/category/Category');

const uploadPhoto = require('../../../../utils/uploadPhoto');
const deletePhoto = require('../../../../utils/deletePhoto');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.category)
    return res.redirect('/');

  if (req.file)
    uploadPhoto(req.file.filename, req.file.size, (err, location) => {
      if (err) return res.redirect('/admin');

      Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
        name: req.body.name,
        category: req.body.category,
        profilePhoto: location
      }}, {new: false}, (err, category) => {
        if (err) return res.redirect('/admin');

        deletePhoto(category.profilePhoto, err => {
          if (err) return res.redirect('/admin');

          return res.redirect('/admin/categories');
        });
      });
    });
  else
    Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      name: req.body.name,
      category: req.body.category
    }}, {}, err => {
      if (err) return res.redirect('/admin');

      return res.redirect('/admin/categories');
    });
}
