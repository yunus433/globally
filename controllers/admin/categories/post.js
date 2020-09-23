const fs = require('fs');

const Category = require('../../../models/category/Category');

const uploadPhoto = require('../../../utils/uploadPhoto');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.category || !req.file)
    return res.redirect('/admin/category');

  Category
    .find({})
    .countDocuments()
    .then(number => {
      uploadPhoto(req.file.filename, req.file.size, (err, location) => {
        if (err) return res.redirect('/admin');

        const newCategoryData = {
          index: number+1,
          category: req.body.category,
          name: req.body.name,
          profilePhoto: location
        };
      
        const newCategory = new Category(newCategoryData);
      
        newCategory.save((err, category) => {
          if (err) return res.redirect('/admin');
          
          return res.redirect('/admin/categories');
        });        
      });
    })
    .catch(err => {
      return res.redirect('/admin');
    });
}
