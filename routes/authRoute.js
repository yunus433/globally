const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/auth/index/get");

const registerPostController = require("../controllers/auth/register/post");
const loginPostController = require("../controllers/auth/login/post");

router.get(
  "/", 
  indexGetController
);

router.post(
  "/register",
  registerPostController
);
router.post(
  "/login",
  loginPostController
);

module.exports = router;
