'use strict'
/* ________________ Synchronization ________________ */

module.exports = async function (){
     // return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */

    /* User */
    const User = require('../models/user')
    await User.deleteMany() // !!! Clear collection.
    await User.create({
        "_id": "65343222b67e9681f937f001",
        "username": "admin",
        "password": "aA?123456",
        "email": "admin@site.com",
        "firstName": "admin",
        "lastName": "admin",
        "isActive": true,
        "isStaff": true,
        "isAdmin": true
    })
    await User.create({
        "_id": "65343222b67e9681f937f002",
        "username": "staff",
        "password": "aA?123456",
        "email": "staff@site.com",
        "firstName": "staff",
        "lastName": "staff",
        "isActive": true,
        "isStaff": true,
        "isAdmin": false
    })
    await User.create({
        "_id": "65343222b67e9681f937f003",
        "username": "test",
        "password": "aA?123456",
        "email": "test@site.com",
        "firstName": "test",
        "lastName": "test",
        "isActive": true,
        "isStaff": false,
        "isAdmin": false
    })
}