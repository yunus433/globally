const Order = require("../../../models/order/Order");

module.exports = (req, res) => {
  Order
    .find({})
    .sort({"createdAt": 1})
    .then(orders => {
      res.render('admin/index', {
        page: 'admin/index',
        title: 'Admin Ana Sayfa',
        includes: {
          external: ["css", "js", "fontawesome", "admin"]
        },
        active_nav_button: "orders",
        orders
      });
    })
    .catch(err => {
      if (err) return res.redirect("/");
    });
};
