const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.js");
const { getProducts, createNewProduct, editProduct, deleteProduct, getProductDetails } = require('../controllers/product.controller.js');
const { createProduct, editProduct: editProductValidation, getProductDetail: getProductDetailValidation, deleteProduct: deleteProductValidation } = require('../validations/product.validation.js');
const logging = require("../middlewares/logging.js");
const cacheMiddleware = require("../middlewares/redis.js");

router.use(logging());

router.get(
  "/",
  cacheMiddleware('products'),
  getProducts
);

router.get(
  "/:id",
  validate(getProductDetailValidation),
  cacheMiddleware('product'),
  getProductDetails
);

router.post(
  "/", 
  validate(createProduct), 
  createNewProduct
);

router.patch(
  "/:id", 
  validate(editProductValidation), 
  editProduct
);

router.delete(
  "/:id", 
  validate(deleteProductValidation), 
  deleteProduct
);

module.exports = router;