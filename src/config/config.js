const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
};

fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config, null, 2));

console.log('config.json has been generated!');
