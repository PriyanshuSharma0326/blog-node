const JWT = require('jsonwebtoken');

async function createUserToken(user) {
    const token = JWT.sign({ ...user }, process.env.CLIENT_SECRET);
    return token;
}

function validateUserToken(token) {
    const user = JWT.verify(token, process.env.CLIENT_SECRET);
    return user;
}

module.exports = {
    createUserToken,
    validateUserToken
}
