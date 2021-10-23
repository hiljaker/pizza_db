const express = require('express');
const { login } = require('../controller/auth_controller');
const router = express.Router()

router.post("/login", login)

module.exports = router