const express = require('express');
const router = express.Router();

const userGetController = require('../controllers/agreement/user/get');
const privacyGetController = require('../controllers/agreement/privacy/get');

router.get(
  '/user',
  userGetController
);
router.get(
  '/privacy',
  privacyGetController
);

module.exports = router;
