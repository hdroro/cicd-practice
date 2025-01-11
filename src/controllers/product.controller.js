const catchAsync = require("../utils/catchAsync.js");
const { getProductsService, createNewProductService, editProductService, deleteProductService, getProductDetailsService } = require("../services/product.service.js");
const httpStatus = require("http-status").status;

const getProducts = catchAsync(async (req, res) => {
    const products = await getProductsService();
    res.status(httpStatus.OK).send(products);
});

const getProductDetails = catchAsync(async (req, res) => {
    const product = await getProductDetailsService(req.params.id);
    res.status(httpStatus.OK).send(product);
});


const createNewProduct = catchAsync(async (req, res) => {
    const products = await createNewProductService(req.body);
    res.status(httpStatus.CREATED).send(products);
});

const editProduct = catchAsync(async (req, res) => {
    const product = await editProductService(req.params.id, req.body);
    res.status(httpStatus.OK).send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
    await deleteProductService(req.params.id);
    res.status(httpStatus.OK).send({ message: 'Delete product successfully!' });
});

module.exports = {
    getProducts,
    getProductDetails,
    createNewProduct,
    editProduct,
    deleteProduct
}