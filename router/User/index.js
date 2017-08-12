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
            const userDocs = yield users.get({ id: id }, {
                filter: {
                    _id: 0,
                    password: 0
                }
            });
            const user = userDocs[0];

            res.json(user);
        }
        catch(err) {
            next(err);
        }
    });
});

// Create new user
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
            // check already exists
            const count = yield users.count({ id: req.body.id });

            if(count > 0) {
                return next({
                    message: 'User already exists.',
                    status: 400,
                    stack: {}
                });
            }

            const hash = yield bcrypt.hash(req.body.password, null, null);

            yield users.create({
                id: req.body.id,
                password: hash,
                createdAt: new Date(),
                updatedAt: new Date,
                level: 0,
                exp: 0,
                rexp: 30,
                totalPlays: 0,
                totalKills: 0,
                spentCash: 0,
                kills: {
                    glock: 0,
                    mp5k: 0,
                    m870: 0,
                    akm: 0,
                    python: 0,
                    ump45: 0
                }
            });

            res.json({});
        }
        catch(err) {
            next(err);
        }
    });
});

// Update user
router.put('/', middlewares.authMiddleware, (req, res, next) => {
    const id = req.user.id;
    const body = req.body;

    co(function*() {
        try {
            yield users.update({ id: id }, {
                $set: {
                    level: +body.level,
                    exp: +body.exp,
                    rexp: +body.rexp,
                    totalKills: +body.totalKills, 
                    spentCash: +body.spentCash || 0, 
                    "kills.glock": +body.killsGlock || 0,
                    "kills.mp5k": +body.killsMp5k || 0,
                    "kills.m870": +body.killsM870 || 0,
                    "kills.akm": +body.killsAkm || 0,
                    "kills.python": +body.killsPython || 0,
                    "kills.ump45": +body.killsUmp45 || 0,
                    updatedAt: new Date()
                },
                $inc: { 
                    totalPlays: 1
                }
            });

            res.json({});
        }
        catch(err) {
            next(err);
        }
    });
});

module.exports = router;