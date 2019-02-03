'use strict';

const redis = require('redis');
const asyncRedis = require('async-redis');
const config = require('../config');

const srv = {};

let client;
let clientPubSub;

srv.init = () => {
    if (client) {
        client.quit();
    }
    client = asyncRedis.decorate(redis.createClient(config.redis.port, config.redis.host));
    client.select(config.redis.database);

    if (clientPubSub) {
        clientPubSub.quit();
    }
    clientPubSub = asyncRedis.decorate(redis.createClient(config.redis.port, config.redis.host));
    clientPubSub.select(config.redis.database);

    return srv;
};

srv.getClient = () => {
    return client;
};

srv.getClientPubSub = () => {
    return clientPubSub;
};

module.exports = srv;
