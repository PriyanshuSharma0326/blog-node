const Blog = require("../models/blog");

async function handleRootRoute(req, res) {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.render('homepage', {
        pageTitle: 'Blog App Home',
        user: req.user,
        currentPath: req.path,
        blogs: allBlogs,
    });
}

function handleSigninRoute(req, res) {
    return res.render('signin', {
        pageTitle: 'Signin',
        user: req.user,
        currentPath: req.path,
    });
}

function handleSignupRoute(req, res) {
    return res.render('signup', {
        pageTitle: 'Signup',
        currentPath: req.path,
    });
}

module.exports = {
    handleRootRoute,
    handleSigninRoute,
    handleSignupRoute,
}
