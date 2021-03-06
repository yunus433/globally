module.exports = (req, res) => {
  return res.render('aboutus/index', {
    page: 'aboutus/index',
    title: 'Hakkımızda',
    includes: {
      external: ['css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
