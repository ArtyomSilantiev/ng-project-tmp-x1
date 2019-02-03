'use strict';

const config = require('../config');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'moderator', 'admin'],
            defaultValue: 'user',
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        underscored: true,
        paranoid: false
    });

    User.associate = function (models) {
        User.hasMany(models.Session);
    };
    User.createUser = async function(email, password) {
        const newUser = await User.create({
            email: email,
            password_hash: crypto.createHash('sha256').update(password + config.node.passwordSalt).digest('base64').toString()
        });
        return newUser;
    }

    User.prototype.publicInfo = function () {
        return {
            id: this.id,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            role: this.role,
            created_at: this.created_at
        };
    };
    User.prototype.privateInfo = function() {
        let info = this.publicInfo();
        info.rating = this.rating;
        info.coins = this.coins;
        info.crystals = this.crystals;
        return info;
    };

    return User;

};
