const { Router } = require('express');
const { handleUserSignup, handleUserSignin } = require('../controllers/user');

const router = Router();

router.post('/signup', handleUserSignup);

router.post('/signin', handleUserSignin);

module.exports = router;
