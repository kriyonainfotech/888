const express = require('express')
const { Signup, Signin, logout, checkAuth } = require('../controller/authController')
const isLoggedIn = require('../middleware/authmiddleware')
const router = express.Router()
router.post('/signup',Signup)
router.get('/checkAuth',isLoggedIn,checkAuth)
router.post('/signin',Signin)
router.get('/logout',logout)
module.exports = router