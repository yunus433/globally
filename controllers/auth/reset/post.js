const crypto = require('crypto');

const User = require('../../../models/user/User');

const sendMail = require('../../../utils/sendMail');

module.exports = (req, res) => {
  if (req.query.id && req.query.code) {
    if (!req.body || !req.body.password)
      return res.redirect('/');

    User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
      if (err || !user) return res.redirect('/auth/reset');

      if (user.password_reset == req.query.code && password_reset_exp_date <= (new Date()).getMilliseconds()) {
        user.password = req.body.password;
        user.password_reset = null;
        user.password_reset_exp_date = null;
  
        user.save(err => {
          if (err) return res.redirect('/auth/reset');
  
          return res.redirect('/auth/login');
        });
      } else {
        req.session.error = "wrong code";
        return res.redirect('/auth/login');
      }
    });
  } else {
    if (!req.body || !req.body.email)
      return res.redirect('/');

    const ten_minutes = 600000;
    const code = crypto.randomBytes(15).toString('hex');;

    User.findOneAndUpdate({
      email: req.body.email
    }, {$set: {
      password_reset: code,
      password_reset_exp_date: (new Date()).getTime() + ten_minutes
    }}, {}, (err, user) => {
      if (err || !user) {
        req.session.error = "Bu e-posta adresi bulunamadı.";
        return res.redirect('/auth/reset');
      }

      sendMail({
        email: user.email,
        user_id: user._id.toString(),
        code
      }, 'password_reset', (err, result) => {
        console.log(err, result);
        req.session.success = "Sıfırlama linki gönderildi, lütfen e-postanızı kontrol edin.";
        return res.redirect('/auth/reset');
      });
    });
  }
}
