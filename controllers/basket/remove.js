module.exports = (req, res) => {
  if (req.body.id && req.session.basket) {
    req.session.basket = req.session.basket.filter(item => {
      return item.id != req.body.id
    });

    res.end();
  }
}
