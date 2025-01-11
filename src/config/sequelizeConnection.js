const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_HOST: host, DB_NAME: name, DB_USER: user, DB_PASSWORD: password } = process.env;

const sequelize = new Sequelize(name, user, password, {
  host: host,
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
