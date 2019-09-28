const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const indexGetController = require("../controllers/buy/get");

const indexPostController = require("../controllers/buy/post");

router.get(
  "/", 
  isLoggedIn,
  indexGetController
);

router.post(
  "/", 
  isLoggedIn,
  indexPostController
);

module.exports = router;
