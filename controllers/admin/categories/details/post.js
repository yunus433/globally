const mongoose = require('mongoose');
const fs = require('fs');

const Category = require('../../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.category)
    return res.redirect('/');

  if (req.file)
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: `globally/category_images/${req.file.filename}`,
        quality: 25,
        format: "JPG",
        secure: true
      },
      (err, result) => {
        if (err) return res.redirect('/');

        fs.unlink("./public/res/uploads/" + req.file.filename, err => {
          if (err) return res.redirect('/');

          Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
            name: req.body.name,
            category: req.body.category,
            profilePhoto: result.secure_url
          }}, {}, (err, category) => {
            if (err) return res.redirect('/');
      
            req.cloudinary.v2.uploader.destroy(
              `globally/product_images/${category.profilePhoto.split('category_images/')[1]}`,
              err => {
                if (err) return res.redirect('/')
        
                return res.redirect('/admin/categories');
              }
            );
          });
        });
      });
  else
    Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      name: req.body.name,
      category: req.body.category
    }}, {}, err => {
      if (err) return res.redirect('/');

      return res.redirect('/admin/categories');
    });
}
