module.exports = (req, res) => {
  return res.render('agreement/privacy', {
    page: 'agreement/privacy',
    title: 'Kişisel Veri Koruma',
    includes: {
      external: ['js','css', 'fontawesome']
    },
    user: req.session.user || undefined
  });
}
