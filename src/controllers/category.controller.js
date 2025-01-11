const catchAsync = require("../utils/catchAsync.js");
const { getAllCategoriesService, createNewCategoryService, editCategoryService, deleteCategoryService, getCategoryDetailService } = require("../services/category.service.js");
const httpStatus = require("http-status").status;

const getCategories = catchAsync(async (req, res) => {
    const categories = await getAllCategoriesService();
    res.status(httpStatus.OK).send(categories);
});

const getCategoryDetails = catchAsync(async (req, res) => {
    const category = await getCategoryDetailService(req.params.id);
    res.status(httpStatus.OK).send(category);
});


const createNewCategory = catchAsync(async (req, res) => {
    const categories = await createNewCategoryService(req.body);
    res.status(httpStatus.CREATED).send(categories);
});

const editCategory = catchAsync(async (req, res) => {
    const category = await editCategoryService(req.params.id, req.body);
    res.status(httpStatus.OK).send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
    await deleteCategoryService(req.params.id);
    res.status(httpStatus.OK).send({ message: 'Delete category successfully!' });
});

module.exports = {
    getCategories,
    getCategoryDetails,
    createNewCategory,
    editCategory,
    deleteCategory
}