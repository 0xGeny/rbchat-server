require('dotenv').config()
const expressJwt = require('express-jwt');

function jwt() {
    const secret = process.env.secret;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/authenticate',
            '/register'
        ]
    });
}

// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };

module.exports = jwt;