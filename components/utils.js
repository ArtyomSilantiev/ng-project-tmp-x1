'use strict';

const srv = {};

srv.getRandomString = function (len) {
    let str = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    len = len || 8;

    for (var i = 0; i < len; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

srv.getUid = function () {
    return Date.now().toString(36) + '.' + srv.getRandomString();
}

module.exports = srv;
