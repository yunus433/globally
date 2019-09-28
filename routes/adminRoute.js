const express = require("express");
const multer = require("multer");

const upload = multer({dest: './public/res/uploads/'});
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");

const indexGetController = require("../controllers/admin/index/get");
const authGetController = require("../controllers/admin/auth/get");
const productsGetController = require("../controllers/admin/products/get");

const authPostController = require("../controllers/admin/auth/post");
const productsPhotoPostController = require("../controllers/admin/products/postPhoto");
const productsPostController = require("../controllers/admin/products/post");

router.get(
  "/",
  isAdmin,
  indexGetController
);
router.get(
  "/auth",
  authGetController
);
router.get(
  "/products",
  isAdmin,
  productsGetController
);

router.post(
  "/auth",
  authPostController
);
router.post(
  "/products/photo",
  upload.single('file'),
  isAdmin,
  productsPhotoPostController
);
router.post(
  "/products",
  isAdmin,
  productsPostController
);

module.exports = router;
