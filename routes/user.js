const { Router } = require('express');
const { handleUserSignup, handleUserSignin, handleUSerLogout } = require('../controllers/user');

const router = Router();

router.post('/signup', handleUserSignup);

router.post('/signin', handleUserSignin);

router.get('/logout', handleUSerLogout);

module.exports = router;
