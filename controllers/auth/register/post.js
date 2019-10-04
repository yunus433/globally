const validator = require("validator");

const User = require("../../../models/user/User");

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
              req.session.register_error = "Bu e-posta adresi ile bir hesap zaten açılmış, lütfen başka bir e-posta adresi deneyin.";
              return res.redirect("/auth");
            }
            if (err) {
              req.session.register_error = "Bir hata oluştu, lütfen tekrar deneyin.";
              return res.redirect("/auth");
            }
      
            req.session.user = user;
            return res.redirect("/");
          });
        } else {
          req.session.register_error = "Şifreniz 5 haneden uzun olmalıdır.";
          return res.redirect("/auth");
        }
      } else {
        req.session.register_error = "Bu e-posta geçerli değil.";
        return res.redirect("/auth");
      }
    } else {
      req.session.register_error = "Lütfen şifrenizi doğru bir şekilde tekrarlayın."
      return res.redirect("/auth");
    }
  } else {
    req.session.register_error = "Lütfen bir e-posta ve şifre seçin ve şifrenizi tekrarlayın.";
    return res.redirect('/auth');
  }
}
