module.exports = (req, res) => {
  return res.render('agreement/index', {
    page: 'agreement/index',
    title: 'Üyelik Sözleşmesi',
    includes: {
      external: ['js','css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
