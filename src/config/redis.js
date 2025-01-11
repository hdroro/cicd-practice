const { createClient } = require('redis');
require("dotenv").config();

const redisClient = createClient({
  socket: {
    host: 'localhost',
    port: process.env.REDIS_PORT,
    connectTimeout: 10000,
  },
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  }
});

redisClient.on('connect', () => {
  console.log('Redis connected!');
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.connect();

module.exports = { redisClient };
