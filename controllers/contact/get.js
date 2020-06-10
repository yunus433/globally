module.exports = (req, res) => {
  return res.render('contact/index', {
    page: 'contact/index',
    title: 'İletişim',
    includes: {
      external: ['css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
