'use strict'
/* __________________ Index Router _________________ */
const router = require('express').Router()
// URL: /

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))

/* ______________________________________________ */
module.exports = router 