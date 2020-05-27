const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findUser(req.body.email, req.body.password, (err, user) => {
      if (err || !user) {
        req.session.error = 'Hesap bulunamadı, lütfen tekrar deneyin.';
        return res.redirect('/auth/login');
      }
  
      req.session.user = getUserObject(user);
      if (req.session.redirect)
        return res.redirect(req.session.redirect);
      else 
        return res.redirect('/');
    });
  } else {
    req.session.error = 'Lütfen e-posta adresinizi ve şifrenizi yazın.';
    return res.redirect('/auth/login');
  }
}
