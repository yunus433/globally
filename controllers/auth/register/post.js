const validator = require('validator');

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  if (req.body && req.body.email && req.body.password && req.body.confirm_password) {
    if (req.body.password == req.body.confirm_password) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length > 5) {
          const newUserData = {
            email: req.body.email,
            password: req.body.password
          };
      
          const newUser = new User(newUserData);
      
          newUser.save((err, user) => {
            if (err && err.code == 11000) {
              req.session.error = 'Bu e-posta adresi ile bir hesap zaten açılmış, lütfen başka bir e-posta adresi deneyin.';
              return res.redirect('/auth/register');
            }
            if (err) {
              req.session.error = 'Bir hata oluştu, lütfen tekrar deneyin.';
              return res.redirect('/auth/register');
            }
      
            req.gateway.customer.create({
              email: req.body.email,
            }, (err, result) => {
              if (err) return res.redirect('/');

              User.findByIdAndUpdate(user._id, {$set: {
                braintreeCustomerID: result.customer.id
              }}, {new: true}, (err, user) => {
                if (err) return res.redirect('/');

                req.session.user = getUserObject(user);
                return res.redirect('/');
              });
            });
          });
        } else {
          req.session.error = 'Şifreniz 5 haneden uzun olmalıdır.';
          return res.redirect('/auth/register');
        }
      } else {
        req.session.error = 'Bu e-posta geçerli değil.';
        return res.redirect('/auth/register');
      }
    } else {
      req.session.error = 'Lütfen şifrenizi doğru bir şekilde tekrarlayın.'
      return res.redirect('/auth/register');
    }
  } else {
    req.session.error = 'Lütfen bir e-posta ve şifre seçin ve şifrenizi tekrarlayın.';
    return res.redirect('/auth/register');
  }
}
