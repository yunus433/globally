module.exports = (req, res) => {
  let error;

  if (req.session.error) {
    error = req.session.error;
    req.session.destroy();
  } else {
    error = null;
  }

  res.render('admin/auth', {
    page: 'admin/auth',
    title: 'Admim Girişi',
    includes: {
      external: ["css", "js", "fontawesome"]
    },
    error
  });
};
