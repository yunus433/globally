module.exports = (req, res) => {
  if (!req.query || !req.query.price)
    return res.redirect('/');

  req.gateway.clientToken.generate({
    customerId: req.session.user.braintreeCustomerID
  }, (err, response) => {
    if (err) return res.redirect('/');

    return res.render('pay/index', {
      page: 'pay/index',
      title: "Ödeme Sayfası",
      includes: {
        external: ['js', 'css', 'braintree', 'fontawesome']
      },
      user: req.session.user,
      price: req.query.price,
      clientToken: response.clientToken
    });
  });
}
