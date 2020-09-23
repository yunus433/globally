module.exports = (req, res, next) => {
  if (req.file && req.file.filename) {
    res.write(JSON.stringify({
      name: req.file.filename,
      size: req.file.size
    }));
    res.end();
  }
  else {
    res.sendStatus(500);
  }
}
