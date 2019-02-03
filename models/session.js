'use strict';

const config = require('../config');

module.exports = (sequelize, DataTypes) => {

    const Session = sequelize.define('Session', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        auth_code: {
            type: DataTypes.STRING,
            unique: true
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
    }, {
        tableName: 'sessions',
        freezeTableName: true,
        underscored: true,
        paranoid: false,
    });

    Session.associate = function (models) {
        Session.belongsTo(models.User);
    };

    return Session;

};
