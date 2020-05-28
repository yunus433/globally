const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  let error = null;
  let success = null;
  let authentication = null;

  if (req.session.error) {
    error = req.session.error;
    req.session.destroy();
  }

  if (req.session && req.session.success) {
    success = req.session.success;
    req.session.destroy();
  }

  if (req.query && req.query.id && req.query.code)
    authentication = true;

  return res.render('auth/reset', {
    page: 'auth/reset',
    title: 'Şifre Sıfırlama',
    includes: {
      external: ['js', 'css', 'fontawesome']
    },
    error,
    success,
    authentication,
    id: req.query.id,
    code: req.query.code
  });
}
