module.exports = (req, res) => {
  return res.render('agreement/user', {
    page: 'agreement/user',
    title: 'Üyelik Sözleşmesi',
    includes: {
      external: ['js','css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
