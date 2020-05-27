module.exports = (req, res) => {
  let error = null;

  if (req.session.error) {
    error = req.session.error;
    req.session.destroy();
  }

  return res.render('auth/register', {
    page: 'auth/register',
    title: 'Üye Ol',
    includes: {
      external: ['js', 'css', 'fontawesome']
    },
    error
  });
}
