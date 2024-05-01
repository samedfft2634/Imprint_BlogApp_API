'use strict'
/* __________________ Index Router _________________ */
const router = require('express').Router()
// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))

/* ______________________________________________ */
module.exports = router 