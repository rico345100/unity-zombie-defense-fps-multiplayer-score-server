const express = require('express');
const router = express.Router();
const co = require('co');
const bcrypt = require(__base + '/bcrypt.js');
const users = require(__base + '/collections/users');
const middlewares = require(__base + '/middlewares');

router.get('/', middlewares.authMiddleware, (req, res, next) => {
    const id = req.user.id;

    co(function*() {
        try {
            const rankDocs = yield users.get({}, {
                filter: {
                    password: 0,
                    exp: 0,
                    rexp: 0,
                    kills: 0,
                    totalPlays: 0,
                    spentCash: 0
                },
                sort: {
                    totalKills: -1,
                    level: -1
                },
                limit: 5
            });

            res.json(rankDocs);
        }
        catch(err) {
            next(err);
        }
    });
});

module.exports = router;