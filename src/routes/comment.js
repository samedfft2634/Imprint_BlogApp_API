'use strict'
/* __________________ Comment Router __________________ */
const router = require('express').Router();

const { isLogin } = require("../middlewares/permissions");
const { create, read, update, delete:deleteComment} = require('../controllers/comment')

// URL: /categories

router.use(isLogin)

router.route('/(:id)?') 
.post(create)
.get(read)
.put(update)
.patch(update)
.delete(deleteComment)

module.exports = router