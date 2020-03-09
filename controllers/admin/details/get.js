const mongoose = require('mongoose');

const Product = require("../../../models/product/Product");

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    return res.render('admin/details', {
      page: 'admin/details',
      title: `Admin ${product.name}`,
      includes: {
        external: ["css", "js", "fontawesome", "admin"]
      },
      active_nav_button: "products",
      product
    });
  })
}
