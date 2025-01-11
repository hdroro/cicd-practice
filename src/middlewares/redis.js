const { redisClient } = require('../config/redis');
const httpStatus = require('http-status').status;

const cacheMiddleware = (keyPrefix) => {
  return async (req, res, next) => {
    try {
      const key = req.params.id ? `${keyPrefix}:${req.params.id}` : keyPrefix;

      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.status(httpStatus.OK).json(JSON.parse(cachedData));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = cacheMiddleware;
