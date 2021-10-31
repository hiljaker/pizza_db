const express = require('express');
const { login, signup, keepLoggedIn, users, userbyid } = require('../controller/auth_controller');
const { verifyAuthToken } = require('../helpers/verify_token');
const router = express.Router()

router.post("/login", login)
router.post('/signup', signup)
router.get('/keeploggedin', verifyAuthToken, keepLoggedIn)
router.get("/users/", users)
router.get("/users/:user_id", userbyid)

module.exports = router