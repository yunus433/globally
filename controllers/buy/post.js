const Order = require("../../models/order/Order");

module.exports = (req, res) => {
  const newOrderData = {
    productList: JSON.parse(req.body.products),
    totalPrice: req.body.price,
    name: req.body.name,
    surName: req.body.surname,
    securityNumber: req.body.tc,
    phone: req.body.phone,
    company: req.body.company,
    city: req.body.city1,
    town: req.body.city2,
    address: req.body.address,
    shippingOption: req.body.shipping
  }

  const newOrder = new Order(newOrderData);
      
  newOrder.save((err, order) => {
    if (err)
      return res.redirect("/");
      
    return res.redirect("/basket");
  });
}
