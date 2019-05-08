const Sequelize = require('sequelize');

const sequelize = new Sequelize("starwars2", "root", "root",
        {
            host: 'localhost',
            port: 8889,
            dialect: 'mysql',
            operatorsAliases: false,
            logging: false,
            define: {
                timestamps: false
            }
        }
    );

module.exports = sequelize;
global.sequelize = sequelize;