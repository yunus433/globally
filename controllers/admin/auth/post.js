module.exports = (req, res) => {
  if (req.body && req.body.password) {
    if (process.env.ADMIN_PASSWORD == req.body.password) {
      req.session.admin = true;
      return res.redirect("/admin");
    } else {
      req.session.error = "Şifre yanlış"
      return res.redirect("/admin/auth");
    }
  } else {
    req.session.error = "Şifre yanlış"
      return res.redirect("/admin/auth");
  }
}
