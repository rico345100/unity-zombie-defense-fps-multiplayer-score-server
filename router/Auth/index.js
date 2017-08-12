const express = require('express');
const router = express.Router();
const bcrypt = require(__base + '/bcrypt');
const uuid = require('uuid/v1');        // Timestamp UUID
const redis = require(__base + '/redis');
const middlewares = require(__base + '/middlewares');
const co = require('co');
const users = require(__base + '/collections/users');

router.post('/', (req, res, next) => {
    co(function*() {
        if(!req.body.id || !req.body.password) {
            return next({
                message: 'ID or Password required',
                status: 400,
                stack: {}
            });
        }

        try {
            const userDocs = yield users.get({ id: req.body.id });

            if(userDocs.length <= 0) {
                return next({
                    message: 'Wrong ID or Password',
                    status: 401,
                    stack: {}
                });
            }

            const user = userDocs[0];

            let loginResult = yield bcrypt.compare(req.body.password, user.password);

            if(!loginResult) {
                return next({
                    message: 'Wrong ID or Password',
                    status: 401,
                    stack: {}
                });
            }

            const token = uuid();
            yield redis.set(token, req.body.id);

            res.json({
                token: token
            });
        }
        catch(err) {
            next(err);
        }
    });
});

router.delete('/', middlewares.authMiddleware, (req, res, next) => {
    co(function*() {
        yield redis.del(req.query.token);
        res.json({});
    });
});

module.exports = router;