"use strict"
/* ______________________ Auth _____________________ */
const router = require('express').Router()
// routes/auth:

const {login, refresh, logout} = require('../controllers/auth')

// URL: /auth

router.post('/login', login) // SimpleToken & JWT
router.post('/refresh', refresh) // JWT Refresh
router.get('/logout', logout) // SimpleToken Logout

/* _______________________ */
module.exports = router