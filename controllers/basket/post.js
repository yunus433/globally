module.exports = (req, res) => {
  if (req.body.id) {
    if (!req.session.basket)
      req.session.basket = [];

    req.session.basket.push(req.body.id);

    res.end();
  }
}
