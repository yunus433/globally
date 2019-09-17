module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Ana Sayfa',
    includes: {
      external: ['js', 'css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
