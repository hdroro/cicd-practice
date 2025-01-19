const httpStatus = require('http-status').status;
const db = require("../models/index.js");
const ApiError = require('../utils/ApiError.js');
const { redisClient } = require('../config/redis.js');

const REDIS_EXPIRATION_TIME = 3600;

const getAllProducts = async () => {
    const products = await db.product.findAll({
        include: {
            model: db.category,
            attributes: ['name']
        },
        raw: true,
        nest: true
    });

    const plainProducts = products.map((item) => {
        return {
            ...item,
            categoryName: item.category.name,
            category: undefined
        }
    });

    return plainProducts;
};

const setProductsToRedis = async () => {
    const plainProducts = await getAllProducts();
    redisClient.setEx('products', REDIS_EXPIRATION_TIME, JSON.stringify(plainProducts));
};

const getProductsService = async () => {
    const plainProducts = await getAllProducts();
    redisClient.setEx('products', REDIS_EXPIRATION_TIME, JSON.stringify(plainProducts));

    return plainProducts
};

const getProductDetailsService = async (id) => {
    const product = await db.product.findOne({
        where: { id },
        include: {
            model: db.category,
            attributes: ['name']
        },
        raw: true,
        nest: true
    });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    };

    const productDetail = {
        ...product,
        categoryName: product.category.name,
        category: undefined
    };

    redisClient.setEx(`product:${id}`, REDIS_EXPIRATION_TIME, JSON.stringify(productDetail));

    return productDetail;
};

const createNewProductService = async (payload) => {
    if (!await db.category.findByPk(payload.categoryId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    };

    const product = await db.product.findOne({
        where: { title: payload.title }
    });
    if (!!product) throw new ApiError(httpStatus.BAD_REQUEST, "This product title already taken");
    
    const newProduct = await db.product.create(payload);

    redisClient.set(`product:${newProduct.id}`, JSON.stringify(newProduct));

    await setProductsToRedis();

    return newProduct;
};

const editProductService = async (id, productBody) => {
    const { title, description, price, categoryId } = productBody;
    if (categoryId && !await db.category.findByPk(categoryId)) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category does not exist");
    };

    const currentProduct = await db.product.findOne({ where: { id } });
    if (!currentProduct) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product does not exist");
    };

    if (title && title.trim() !== currentProduct.title) {
        const existingProduct = await db.product.findOne({
            where: { title: title.trim() }
        });

        if (existingProduct) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "This product name is already taken"
            );
        }
    };

    redisClient.del(`product:${id}`);

    await currentProduct.update({
        title: title?.trim() ?? currentProduct.title,
        description: description?.trim() ?? currentProduct.description,
        price: price ?? currentProduct.price,
        categoryId: categoryId ?? currentProduct.categoryId,
    });

    redisClient.set(`category:${id}`, JSON.stringify(currentProduct));

    await setProductsToRedis();

    return currentProduct;
};

const deleteProductService = async (id) => {
    const product = await db.product.findByPk(id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    await product.destroy();

    redisClient.del(`product:${id}`);

    await setProductsToRedis();
};


module.exports = {
    getProductsService,
    getProductDetailsService,
    createNewProductService,
    editProductService,
    deleteProductService
};