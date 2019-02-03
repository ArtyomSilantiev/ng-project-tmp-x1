module.exports = {
    node: {
        port: 3000,
        host: 'localhost:3000',
        protocol: 'http:',
        passwordSalt: 'hfghr564532fd'
    },
    database: {
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        host: 'postgres',
        port: 5432,
        migrationStorageTableName: 'sequelize_migrations',
        seederStorageTableName: 'sequelize_seeds',
        seederStorage: 'sequelize',

        pool: {
            max: 3,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        dialect: 'postgres'
    },
    redis: {
        host: 'redis',
        port: 6379,
        database: 0
    }
};
