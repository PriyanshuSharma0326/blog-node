const express = require('express');
const { handleRootRoute } = require('../controllers/staticRoute');

const router = express.Router();

router.get('/', handleRootRoute);

module.exports = router;
