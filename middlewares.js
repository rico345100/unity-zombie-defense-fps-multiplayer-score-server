const redis = require(__base + '/redis');
const co = require('co');

function authMiddleware(req, res, next) {
    if(!req.query.token) {
        return next({
            status: 401,
            message: 'Unauthorized Request',
            stack: {}
        });
    }

    co(function*() {
        try {
            const token = req.query.token;
            const id = yield redis.get(token);

            if(!id) {
                return next({
                    status: 401,
                    message: 'Unauthorized Request'
                });
            }

            req.user = {
                id: id
            };
            
            next();
        }
        catch(err) {
            next(err);
        }
    });
}

module.exports = {
    authMiddleware: authMiddleware
};