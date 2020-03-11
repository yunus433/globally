const express = require('express');
const multer = require('multer');

const upload = multer({dest: './public/res/uploads/'});
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const indexGetController = require('../controllers/admin/index/get');
const authGetController = require('../controllers/admin/auth/get');
const productsGetController = require('../controllers/admin/products/get');
const detailsGetController = require('../controllers/admin/details/get');

const authPostController = require('../controllers/admin/auth/post');
const productsPhotoPostController = require('../controllers/admin/products/postPhoto');
const productsPostController = require('../controllers/admin/products/post');
const detailsPostController = require('../controllers/admin/details/post');
const deletePostController = require('../controllers/admin/details/delete');
const detailsAddPhotoPostController = require('../controllers/admin/details/postPhoto');
const detailsDeletePhotoPostController = require('../controllers/admin/details/deletePhoto');

router.get(
  '/',
  isAdmin,
  indexGetController
);
router.get(
  '/auth',
  authGetController
);
router.get(
  '/products',
  isAdmin,
  productsGetController
);
router.get(
  '/details',
  isAdmin,
  detailsGetController
);
router.get(
  '/details/delete',
  isAdmin,
  deletePostController
);

router.post(
  '/auth',
  authPostController
);
router.post(
  '/products/photo',
  upload.single('file'),
  isAdmin,
  productsPhotoPostController
);
router.post(
  '/products',
  isAdmin,
  productsPostController
);
router.post(
  '/details',
  isAdmin,
  detailsPostController
);
router.post(
  '/details/photo/add',
  upload.single('file'),
  isAdmin,
  detailsAddPhotoPostController
);
router.post(
  '/details/photo/delete',
  isAdmin,
  detailsDeletePhotoPostController
);

module.exports = router;
