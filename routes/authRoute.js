const express = require('express');
const router = express.Router();

const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');

const registerPostController = require('../controllers/auth/register/post');
const loginPostController = require('../controllers/auth/login/post');

router.get(
  '/login', 
    loginGetController
);
router.get(
  '/register',
    registerGetController
);

router.post(
  '/register',
    registerPostController
);
router.post(
  '/login',
    loginPostController
);

module.exports = router;
