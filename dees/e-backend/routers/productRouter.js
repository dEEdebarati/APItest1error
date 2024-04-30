const router = require('express').Router();
const {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    getPhoto
} = require("../controllers/productController");
//const { required } = require("joi");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductById)
    .put([authorize, admin], updateProductById);

router.route('/photo/:id')
    .get(getPhoto)

module.exports = router;