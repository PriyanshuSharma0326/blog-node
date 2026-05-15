const { Router } = require('express');
const { handleRootRoute, handleSigninRoute, handleSignupRoute } = require('../controllers/staticRoute');

const router = Router();

router.get('/', handleRootRoute);

router.get('/signin', handleSigninRoute);

router.get('/signup', handleSignupRoute);

module.exports = router;
