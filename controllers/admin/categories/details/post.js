const mongoose = require('mongoose');

const Category = require('../../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.category)
    return res.redirect('/');

  Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    name: req.body.name,
    category: req.body.category
  }}, {}, err => {
    if (err) return res.redirect('/');

    return res.redirect('/admin/categories');
  });
}
