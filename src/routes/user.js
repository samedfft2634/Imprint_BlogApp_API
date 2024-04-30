'use strict'
/* __________________ User Router __________________ */
const router = require('express').Router();

const { isAdmin, isStaff } = require("../middlewares/permissions");
const {create, read, update, delete:deleteUser} = require('../controllers/user')

// URL: /users

router.route('/(:id)?') 
.post(create)
.get(isStaff, read)
.put(isAdmin, update)
.patch(isAdmin, update)
.delete(isAdmin, deleteUser)

module.exports = router