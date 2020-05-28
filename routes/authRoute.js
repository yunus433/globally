const express = require('express');
const router = express.Router();

const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const logoutGetController = require('../controllers/auth/logout/get');
const resetGetController = require('../controllers/auth/reset/get');

const registerPostController = require('../controllers/auth/register/post');
const loginPostController = require('../controllers/auth/login/post');
const resetPostController = require('../controllers/auth/reset/post');

router.get(
  '/login', 
    loginGetController
);
router.get(
  '/register',
    registerGetController
);
router.get(
  '/logout',
    logoutGetController
);
router.get(
  '/reset',
    resetGetController
);

router.post(
  '/register',
    registerPostController
);
router.post(
  '/login',
    loginPostController
);
router.post(
  '/reset',
    resetPostController
);

module.exports = router;
