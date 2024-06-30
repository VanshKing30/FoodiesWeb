const express = require('express');
const { saveContactMessage } = require('../controllers/Auth');
const router = express.Router();

router.post('/', saveContactMessage);

module.exports = router;
