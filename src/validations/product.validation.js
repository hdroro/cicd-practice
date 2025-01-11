const Joi = require('joi');

const getProducts = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};


const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
};

const getProductDetail = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
};

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().max(100).trim().required(),
    description: Joi.string().max(1600).optional().allow(''),
    price: Joi.number().required(),
    categoryId: Joi.number().integer().positive().required()
  }),
};

const editProduct = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  }),
  body: Joi.object().keys({
    title: Joi.string().max(100).trim().optional(),
    description: Joi.string().max(1600).optional().allow(''),
    price: Joi.number().optional(),
    categoryId: Joi.number().integer().positive().optional()
  }),
};

module.exports = {
  getProducts,
  deleteProduct,
  getProductDetail,
  createProduct,
  editProduct
}