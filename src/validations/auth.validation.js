const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login
}