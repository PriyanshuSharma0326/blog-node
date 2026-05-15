function handleRootRoute(req, res) {
    return res.render('homepage', {
        pageTitle: 'Blog App Home',
    });
}

function handleSigninRoute(req, res) {
    return res.render('signin', {
        pageTitle: 'Signin',
    });
}

function handleSignupRoute(req, res) {
    return res.render('signup', {
        pageTitle: 'Signup',
    });
}

module.exports = {
    handleRootRoute,
    handleSigninRoute,
    handleSignupRoute,
}
