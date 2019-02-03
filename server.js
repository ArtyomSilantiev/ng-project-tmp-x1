'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const redis = require('./components/redis').init();
const app = new express();
const socketComponent = require('./components/socket');
const models = require('./models');

socketComponent.clearRedis();

/**
 *
 * EXPRESS USE
 *
 */
app.use(cookieParser());
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));
app.use(bodyParser.text());


/**
 *
 * ROUTES
 *
 */
app.get('/', (req, res, next) => {
    res.sendfile('./dist/ng-project-tmp-x1/index.html');
});

app.use('/api', require('./routes/api'));

app.use(express.static('./dist/ng-project-tmp-x1'));
app.get('/404', function (req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});
app.use((req, res, next) => {
    res.sendfile('./dist/ng-project-tmp-x1/index.html');
});

const http = require('http').Server(app).listen(config.node.port, config.hostIp, function () {
    console.log('Listening at %s:%d', this.address().address, this.address().port);
});

socketComponent.init(http);

