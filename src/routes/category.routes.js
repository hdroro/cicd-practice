const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.js");
const { getCategories, createNewCategory, editCategory, deleteCategory, getCategoryDetails } = require('../controllers/category.controller.js');
const { createCategory, editCategory: editCategoryValidation, getCategoryDetail: getCategoryDetailValidation, deleteCategory: deleteCategoryValidation } = require('../validations/category.validation.js');
const logging = require("../middlewares/logging.js");
const cacheMiddleware = require("../middlewares/redis.js");

router.use(logging());

router.get(
  "/", cacheMiddleware('categories'), getCategories
);

router.get(
  "/:id",
  validate(getCategoryDetailValidation),
  cacheMiddleware('category'),
  getCategoryDetails
);

router.post(
  "/", 
  validate(createCategory),
  createNewCategory
);

router.patch(
  "/:id", 
  validate(editCategoryValidation),
  editCategory
);

router.delete(
  "/:id", 
  validate(deleteCategoryValidation),
  deleteCategory
);

module.exports = router;