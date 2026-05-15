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
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);

    console.log(user);
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserSignin, 
}
