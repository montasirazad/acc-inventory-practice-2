const express = require('express');
const productController = require('../controllers/product.controller')

const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route("/bulk-update")
    .patch(productController.bulkUpdateProducts);

router.route("/bulk-delete")
    .delete(productController.bulkDeleteProduct);

router.route("/:id")
    .patch(productController.updateProducts)
    .delete(productController.deleteProductById);



module.exports = router;