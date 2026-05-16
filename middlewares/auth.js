const { validateUserToken } = require("../services/auth");

function verifyAuthCookie(cookie) {
    return (
        (req, res, next) => {
            const token = req.cookies[cookie];
            if(!token) return next();

            try {
                const user = validateUserToken(token);
                req.user = user;
            }
            catch(err) {
            }

            next();
        }
    );
}

module.exports = {
    verifyAuthCookie,
}
