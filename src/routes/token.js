"use strict"
/* __________________ Token Router _________________ */
const router = require('express').Router()

// routes/token:

const { isAdmin } = require('../middlewares/permissions')
const {list, create, read, update, delete:deleteToken } = require('../controllers/token')

// URL: /tokens

router.use(isAdmin)

router.route('/')
    .get(list)
    .post(create)

router.route('/:id')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteToken)

/* ___________________________________ */
module.exports = router