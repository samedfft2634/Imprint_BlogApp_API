'use strict'
/* __________________ Permissions __________________ */
module.exports = {
    isLogin:(req, res, next)=>{
        // return next() // set passive:

        // any User:
        if (req.user && req.user.isActive){
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login!')
        }
    },

    isAdmin: (req, res, next)=>{
        // return next() // set passive:

        // only Admin:
        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },

    isStaff: (req, res, next) => {
        // return next() // set passive:
        
        // only Admin or Staff:
        if (req.user && req.user.isActive && (req.user.isAdmin || req.user.isStaff)) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Staff.')
        }
    },
}