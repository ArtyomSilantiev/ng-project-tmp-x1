'use strict';

const _ = require('lodash');
const socketIo = require('socket.io');
const models = require('../models');
const redis = require('../components/redis').getClient();
const config = require('../config');
const utils = require('../components/utils');
const redisIo = require('socket.io-redis');
const cluster = require('cluster');

const srv = {};
let io;

srv.init = async function(app) {
    io = socketIo(app);
    io.adapter(redisIo({ host: config.redis.host, port: config.redis.port }));

    if (process.env.IS_MASTER) {
        console.log('Is master node : ', process.pid, '(PID)');
    }

    io.on('connection', (socket) => {
        socket.on('auth', async (data) => {
            const token = data.token;
            const authCode = data.authCode;

            if (!token || !authCode) {
                return socket.emit('auth-res', 'err-bad-auth-data');
            }

            const session = await models.Session.findOne({
                include: {
                    model: models.User
                },
                where: {
                    token: token,
                    auth_code: authCode
                }
            });

            if (!session) {
                return socket.emit('auth-res', 'err-session-not-found');
            }

            const userId = session.User.id;
            await redis.hset(`app:socketData:${socket.id}`, 'userId', userId);
            await redis.hset(`app:socketData:${socket.id}`, 'token', token);
            await redis.hset(`app:socketData:${socket.id}`, 'authCode', token);

            await redis.rpush(`app:user_socketsIds:${userId}`, socket.id);

            return io.to(socket.id).emit('auth-res', 'success');
        });

        socket.on('logout', async () => {
            await redis.del(`app:socketData:${socket.id}`);
            return socket.emit('logout-res', 'success');
        });

        socket.on('disconnect', async () => {
            const socketData = await redis.hgetall(`app:socketData:${socket.id}`);

            if (socketData) {
                const userId = socketData.userId;
                await redis.lrem(`app:user_socketsIds:${userId}`, 0, socket.id);
            }

            await redis.del(`app:socketData:${socket.id}`);
            await deleteFindGamePosition(socket.id);
        });

        socket.on('hello', (data) => {
            socket.emit('hello:res', {
                message: 'hello'
            });
        });

    });
}

async function isAuth(socket) {
    const userId = await redis.hget(`game:socketData:${socket.id}`, 'userId');

    if (!userId) {
        return false;
    }

    return true;
}

srv.clearRedis = async () => {
    let keys = await redis.keys('app:socketData:*');
    for (const key of keys) {
        await redis.del(key);
    }

    keys = await redis.keys('app:user_socketsIds:*');
    for (const key of keys) {
        await redis.del(key);
    }
};

srv.emitToUserId = async (userId, type, data) => {
    const socketsIds = await redis.lrange(`app:user_socketsIds:${userId}`, 0, -1);
    for (const socketId of socketsIds) {
        io.to(socketId).emit(type, data);
    }
}

if (process.env.IS_MASTER) {
    srv.clearRedis();
}

module.exports = srv;
