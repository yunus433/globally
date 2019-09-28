module.exports = (req, res) => {
  res.render('admin/index', {
    page: 'admin/index',
    title: 'Admin Ana Sayfa',
    includes: {
      external: ["css", "js", "fontawesome", "admin"]
    },
    active_nav_button: "orders"
  });
};
