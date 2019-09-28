const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/basket/get");

const indexPostController = require("../controllers/basket/post");
const removePostController = require("../controllers/basket/remove");

router.get(
  "/", 
  indexGetController
);

router.post(
  "/", 
  indexPostController
);
router.post(
  "/remove",
  removePostController
);

module.exports = router;
