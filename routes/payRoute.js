const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedin");

const indexGetController = require("../controllers/pay/get");

router.get(
  "/", 
  isLoggedIn,
  indexGetController
);

module.exports = router;
