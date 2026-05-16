const User = require("../models/user");

async function handleUserSignup(req, res) {
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

    return res.redirect('/');
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
    res.clearCookie('uid').redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserSignin, 
    handleUSerLogout
}
