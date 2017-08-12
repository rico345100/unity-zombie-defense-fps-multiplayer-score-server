"use strict";
const express = require('express');
const router = express.Router();
const authRoutes = require('./Auth');
const ranksRoutes = require('./Ranks');
const userRoutes = require('./User');

router.use('/auth', authRoutes);
router.use('/ranks', ranksRoutes);
router.use('/user', userRoutes);

router.get('/', (req, res) => {
    res.json({
        message: 'Helloworld!'
    });
});

module.exports = router;