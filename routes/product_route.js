const express = require('express');
const { products, addProduct, deleteProduct } = require('../controller/product_controller');
const router = express.Router()

router.get("/products", products)
router.post("/addproduct", addProduct)
router.delete("/deleteproduct/:product_id", deleteProduct)

module.exports = router