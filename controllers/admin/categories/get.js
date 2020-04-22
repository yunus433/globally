const Category = require('../../../models/category/Category');

module.exports = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.redirect('/admin');

    return res.render('admin/categories', {
      page: 'admin/categories',
      title: 'Kategoriler',
      includes: {
        external: ['js', 'css', 'fontawesome', 'admin']
      },
      active_nav_button: "categories",
      user: req.session.user || undefined,
      categories
    });
  })
}
