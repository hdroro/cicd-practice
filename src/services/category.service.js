const httpStatus = require('http-status').status;
const db = require("../models/index.js");
const ApiError = require('../utils/ApiError.js');
const { redisClient } = require('../config/redis.js');

const REDIS_EXPIRATION_TIME = 3600;

const createNewCategoryService = async (payload) => {
    const category = await db.category.findOne({
        where: { name: payload.name }
    });
    if (!!category) throw new ApiError(httpStatus.BAD_REQUEST, "This category name already taken");
    const newCategory = await db.category.create(payload);

    redisClient.set(`category:${newCategory.id}`, JSON.stringify(newCategory));
    
    return newCategory;
};


const deleteCategoryService = async (categoryId) => {
    const category = await db.category.findByPk(categoryId);
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    const productInCategory = await db.product.findOne({
        where: { categoryId }
    });

    if (productInCategory) throw new ApiError(httpStatus.BAD_REQUEST, 'The category already has products, cannot delete')
    await category.destroy();

    redisClient.del(`category:${categoryId}`);
}

const getAllCategoriesService = async () => {
    const categories = await db.category.findAll();

    redisClient.setEx('categories', REDIS_EXPIRATION_TIME, JSON.stringify(categories));
    return categories;
};


const editCategoryService = async (categoryId, { name, description }) => {
    const currentCategory = await db.category.findOne({ where: { id: categoryId } });
    if (!currentCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category does not exist");
    }

    if (name && name.trim() !== currentCategory.name) {
        const existingCategory = await db.category.findOne({
            where: { name: name.trim() }
        });

        if (existingCategory) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "This category name is already taken"
            );
        }
    }

    redisClient.del(`category:${categoryId}`);

    await currentCategory.update({
        name: name?.trim() ?? currentCategory.name,
        description: description?.trim() ?? currentCategory.description,
    });

    redisClient.set(`category:${categoryId}`, JSON.stringify(currentCategory));

    return currentCategory;
};

const getCategoryDetailService = async (categoryId) => {
    const category = await db.category.findByPk(categoryId);
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

    redisClient.setEx(`category:${categoryId}`, REDIS_EXPIRATION_TIME, JSON.stringify(category));
    
    return category;
};


module.exports = {
    createNewCategoryService,
    deleteCategoryService,
    getAllCategoriesService,
    editCategoryService,
    getCategoryDetailService
}
