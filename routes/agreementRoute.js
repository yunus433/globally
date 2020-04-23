const express = require("express");
const router = express.Router();
const indexGetController = require("../controllers/agreement/get");

router.get(
  "/",
  indexGetController
);

module.exports = router;
