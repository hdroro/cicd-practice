const express = require('express');
const productRoute = require('./product.routes.js');
const categoryRoute = require('./category.routes.js');
const authRoute = require('./auth.routes.js');
const authenticateToken = require('../middlewares/auth.js');

const router = express.Router();

router.use("/auth", authRoute);

// router.use(authenticateToken);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);

module.exports = router;
