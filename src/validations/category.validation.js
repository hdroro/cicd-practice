const Joi = require('joi');

const getCategories = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};


const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
};

const getCategoryDetail = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
};

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().max(100).trim().required(),
    description: Joi.string().max(1600).optional().allow(''),
  }),
};

const editCategory = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().max(100).trim().optional(),
    description: Joi.string().max(1600).optional().allow(''),
  }),
};

module.exports = {
  getCategories,
  deleteCategory,
  getCategoryDetail,
  createCategory,
  editCategory
}