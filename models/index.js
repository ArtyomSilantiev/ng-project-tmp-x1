'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const dbConf = config.database;
let sequelize = new Sequelize(_.merge({}, dbConf, {
    logging: (msg) => {
        // console.log('DB:', msg);
    }
}));
const db = {};

db.models = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.reconect = function () {
    let dbConf = config[config.env] || config.database;
    let sequelize = new Sequelize(_.merge({}, dbConf, {
        logging: (msg) => {
            // console.log('DB:', msg);
        }
    }));
    let basename = path.basename(__filename);

    fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach((file) => {
        let model = sequelize['import'](path.join(__dirname, file));
        console.log('model.name', model.name);
        db[model.name] = model;
    });
    _.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
};

db.reconect();

module.exports = db;
