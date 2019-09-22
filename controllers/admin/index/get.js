module.exports = (req, res) => {
  res.render('admin/index', {
    page: 'admin/index',
    title: 'Admim Ana Sayfa',
    includes: {
      external: ["css", "js", "fontawesome"]
    }
  });
};
