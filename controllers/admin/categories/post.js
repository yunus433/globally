const fs = require('fs');

const Category = require('../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.category || !req.file)
    return res.redirect('/admin/category');

  req.cloudinary.v2.uploader.upload(
    "./public/res/uploads/" + req.file.filename,
    {
      public_id: "globally/category_images/" + req.file.filename,
      quality: 25,
      format: "JPG",
      secure: true
    }, (err, result) => {
      if (err) return res.redirect("/admin");
      
      fs.unlink("./public/res/uploads/" + req.file.filename, err => {
        if (err) return res.redirect("/admin");
  
        const newCategoryData = {
          category: req.body.category,
          name: req.body.name,
          profilePhoto: result.secure_url
        };
      
        const newCategory = new Category(newCategoryData);
      
        newCategory.save((err, category) => {
          if (err) return res.redirect("/admin");
      
          return res.redirect("/admin/categories");
        });
      });
    })
}
