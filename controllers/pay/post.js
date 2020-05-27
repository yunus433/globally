const mongoose = require('mongoose');

module.exports = (req, res) => {
  if (!req.body || !req.body.nonce)
    return res.redirect('/');

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/');

    req.gateway.transaction.sale({
      amount: user.currentPrice.toString(),
      currency: "TRY",
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, (err, result) => {
      if (err) return res.redirect('/');
    });

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
      
      
    });
  });
}
