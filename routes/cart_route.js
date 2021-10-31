const express = require('express');
const { addToCart, getCartData, deleteFromCart } = require('../controller/cart_controller');
const router = express.Router()

router.get("/getcart/:user_id", getCartData)
router.post("/addtocart/:user_id", addToCart)
router.delete("/deletefromcart/:product_id/:user_id", deleteFromCart)

module.exports = router