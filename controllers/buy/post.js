const mongoose = require('mongoose');

const Order = require('../../models/order/Order');
const User = require('../../models/user/User');

module.exports = (req, res) => {
  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
    name: req.body.name,
    surName: req.body.surName,
    securityNumber: req.body.tc,
    phone: req.body.phone,
    company: req.body.company,
    city: req.body.city1,
    town: req.body.city2,
    address: req.body.address
  }}, {new: true}, (err, user) => {
    if (err) return res.redirect('/');

    req.session.basket = [];

    const newOrderData = {
      productList: user.currentProducts,
      totalPrice: user.currentPrice,
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
      if (err) return res.redirect('/');
      
      return res.redirect('/basket');
    });
  });
}
