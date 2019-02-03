'use strict';

const _ = require('lodash');
const config = require('../../config');
const models = require('../../models');
const utils = require('../../components/utils');
const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    next();
});

async function pathRequest(req, token, session) {
    req.token = token;
    req.session = {
        model: session
    };
    if (session.User && req.authCode === session.auth_code) {
        req.session.isAuth = true;
        req.user = session.User;
    } else {
        req.session.isAuth = false;
        req.user = null;
    }
}

async function createSession(req, res) {
    const newToken = Date.now().toString(36) + '.' + utils.getRandomString();

    const newSession = await models.Session.create({
        token: newToken,
        user: null
    });

    res.cookie('token', newToken, {
        maxAge: 1000 * 60 * 24 * 365, // 1 year
        httpOnly: true // The cookie only accessible by the web server
    });

    await pathRequest(req, newToken, newSession);
}

/**
 * SESSIONS
 */
router.use(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        req.language = req.headers['x-language'] || 'en';
        req.authCode = req.headers['x-auth-code'];

        if (token) {
            const session = await models.Session.findOne({
                include: {
                    model: models.User
                },
                where: {
                    token: token
                }
            });

            if (session) {
                pathRequest(req, token, session);
            } else {
                await createSession(req, res);
            }
        } else {
            await createSession(req, res);
        }

        next();
    } catch (error) {
        next(error);
    }
});

// routes
router.use('/user', require('./user'));

router.get('/hello', async (req, res, next) => {
    try {
        res.json({
            code: 200,
            data: {
                message: 'Hello!'
            }
        })
    } catch(err) {
        next(err);
    }
});

router.use((error, req, res, next) => {
    console.log('error', error);

    res.json({
        code: 400,
        error: error
    });
});

module.exports = router;
