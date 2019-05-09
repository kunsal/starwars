const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        operatorsAliases: false,
        logging: false,
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;
global.sequelize = sequelize;