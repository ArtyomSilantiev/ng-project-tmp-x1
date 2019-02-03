'use strict';

const _ = require('lodash');

const defaultEnv = require('../env.node.default');

const env = require('../env.node');

const config = _.merge({}, defaultEnv, env);

module.exports = config;
