module.exports = (req, res) => {
  if (req.body.id && req.body.number) {
    if (!req.session.basket)
      req.session.basket = [];

    req.session.basket.push({
      id: req.body.id,
      number: req.body.number
    });

    res.end();
  }
}
