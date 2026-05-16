const User = require("../models/user");

async function handleUserSignup(req, res) {
    try {
        const {
            fullname, 
            email, 
            password 
        } = req.body;

        await User.create({
            fullname, 
            email, 
            password, 
        });

        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.status(200).cookie('uid', token).redirect('/');
    }
    catch(err) {
        if (err.code === 11000) {
            return res.status(409).render('signup', {
                pageTitle: 'Signup',
                error: 'An account with this email already exists.',
                currentPath: '/signup',
            });
        }
        return res.status(500).render('signup', {
            pageTitle: 'Signup',
            error: 'Something went wrong. Please try again.',
            currentPath: '/signup',
        });
    }
}

async function handleUserSignin(req, res) {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.status(200).cookie('uid', token).redirect('/');
    }
    catch(err) {
        return res.status(404).render('signin', {
            pageTitle: 'Error',
            error: err
        });
    }
}

function handleUSerLogout(req, res) {
    res.status(200).clearCookie('uid').redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserSignin, 
    handleUSerLogout
}
