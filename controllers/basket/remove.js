module.exports = (req, res) => {
  if (req.body.id && req.session.basket) {
    req.session.basket = req.session.basket.filter(id => {
      return id != req.body.id
    });

    res.end();
  }
}
