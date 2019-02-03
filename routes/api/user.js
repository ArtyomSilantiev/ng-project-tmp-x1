'use strict';

const express = require('express');
const _ = require('lodash');
const validator = require('validator');
const crypto = require('crypto');
const config = require('../../config');
const models = require('../../models');
const utils = require('../../components/utils');

const router = express.Router();

// get session and auth
router.get('', async (req, res, next) => {
    try {
        const resData = {
            token: req.token,
        };

        if (req.user) {
            resData.isAuth = true;
            resData.user = req.user.privateInfo();
        }

        res.json({
            code: 200,
            data: resData
        });
    } catch (err) {
        next
    }
});

// get user by id
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.json({
                code: 400,
                error: 'user not found'
            });
        }

        res.json({
            code: 200,
            data: {
                user: user.publicInfo()
            }
        });
    } catch (err) {
        next
    }
});

// user create
router.post('/create', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const passwordAgain = req.body.passwordAgain;

        if (!validator.isEmail(email)) {
            return res.json({
                code: 400,
                error: 'bad email'
            });
        }

        if (password !== passwordAgain) {
            return res.json({
                code: 400,
                error: 'bad passwords'
            });
        }

        res.json({
            code: 200,
            data: newUser.publicInfo()
        });
    } catch (err) {
        next(err);
    }
});

// user login
router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const passwordHash = crypto.createHash('sha256').update(password + config.node.passwordSalt).digest('base64').toString();

        const user = await models.User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.json({
                code: 400,
                error: 'user not found'
            });
        }

        if (passwordHash !== user.password_hash) {
            return res.json({
                code: 400,
                error: 'bad password'
            });
        }

        const authCode = Date.now().toString(36) + '.' + utils.getRandomString(32);
        req.session.model.auth_code = authCode;
        req.session.model.user_id = user.id;
        await req.session.model.save();

        res.json({
            code: 200,
            data: {
                authCode: authCode,
                user: user.privateInfo()
            }
        });
    } catch (err) {
        next(err);
    }
});

// user logout
router.post('/logout', async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                code: 400,
                error: 'need auth for logout'
            });
        }

        req.session.model.authCode = '';
        req.session.model.user_id = null;
        await req.session.model.save();

        res.json({
            code: 200,
            data: {}
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
