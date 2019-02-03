'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "sessions", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-02-03T08:31:32.549Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.BIGINT.UNSIGNED,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.ENUM('user', 'moderator', 'admin'),
                    "field": "role",
                    "allowNull": false,
                    "defaultValue": "user"
                },
                "password_hash": {
                    "type": Sequelize.STRING,
                    "field": "password_hash"
                },
                "avatar": {
                    "type": Sequelize.STRING,
                    "field": "avatar"
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "sessions",
            {
                "id": {
                    "type": Sequelize.BIGINT.UNSIGNED,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "unique": true,
                    "allowNull": false
                },
                "auth_code": {
                    "type": Sequelize.STRING,
                    "field": "auth_code",
                    "unique": true
                },
                "user_id": {
                    "type": Sequelize.BIGINT.UNSIGNED,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "field": "user_id"
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
