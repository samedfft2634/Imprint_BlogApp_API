"use strict"
/* ____________________ Upload ___________________ */

const multer = require('multer')

module.exports = multer({
    storage: multer.diskStorage({
        destination: './upload/',
        filename: function(req, file, returnCallback) {
            returnCallback(null, file.originalname)
        }
    })
})