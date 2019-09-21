module.exports = (req, res) => {
  let login_error;
  let register_error;

  if (req.session.login_error) {
    login_error = req.session.login_error;
    req.session.destroy();
  } else if (req.session.register_error) {
    register_error = req.session.register_error;
    req.session.destroy();
  } else {
    error = null;
  }
  return res.render('auth/index', {
    page: 'auth/index',
    title: 'Giriş Yap',
    includes: {
      external: ['js', 'css', 'fontawesome']
    },
    login_error,
    register_error
  });
}
