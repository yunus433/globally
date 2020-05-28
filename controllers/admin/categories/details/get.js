const mongoose = require('mongoose');

const Category = require('../../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Category.findById(mongoose.Types.ObjectId(req.query.id), (err, category) => {
    if (err || !category) return res.redirect('/');

    return res.render('admin/categories/details', {
      page: 'admin/categories/details',
      title: category.name,
      includes: {
        external: ['css', 'fontawesome', 'admin']
      },
      active_nav_button: "categories",
      category
    });
  });
}
