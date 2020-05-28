const async = require('async');
const mongoose = require('mongoose');

const Category = require('../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.body || !req.body.categories)
    return res.redirect('/admin');

  async.times(
    req.body.categories.length,
    (time, next) => {
      Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.categories[time]._id), {
        index: time+1
      }, {}, (err, category) => next(err, category));
    },
    (err, category) => {
      if (err) return res.redirect('/admin');

      return res.redirect('/admin/categories');
    }
  );
}
