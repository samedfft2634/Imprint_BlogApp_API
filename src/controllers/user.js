"use strict";
/* ________________ User Controller ________________ */
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
	create: async (req, res) => {
		/*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

		/* SendMail *
        sendMail(
            data.email, 
            'Welcome', 
            `
                <h1>Welcome ${data.username}</h1>
                <p>Welcome to Blog API Services.</p>
            `
        )
        */

		req.body.isStaff = false;
		req.body.isAdmin = false;

		const data = await User.create(req.body);

		/* Auto Login */
		const tokenData = await Token.create({
			userId: data._id,
			token: passwordEncrypt(data._id + Date.now()),
		});
		/* Auto Login */

		res.status(201).send({
			error: false,
			token: tokenData?.token,
			data,
		});
	},

	read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users or Get Single User"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

		if (req.params?.id) {
			// Get Single User
			const customFilters = req.user?.isAdmin	? { _id: req.params.id } : { _id: req.user._id };

			const data = await User.findOne(customFilters);
			res.status(200).send({
				error: false,
				data,
			});
		} else {
			// List Users
			const customFilters = req.user?.isAdmin	? {} : { _id: req.user._id };

			const data = await res.getModelList(User, customFilters);

			res.status(200).send({
				error: false,
				details: await res.getModelListDetails(User, customFilters),
				data,
			});
		}
	},

	update: async (req, res) => {
         /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
       const customFilters = req.user?.isAdmin ? {_id:req.params.id} : {_id: req.user._id };

       if(!req.user.isAdmin){
            delete req.body.isStaff;
            delete req.body.isAdmin;
            delete req.body.isActive;
       }
       if (req.user.isAdmin) delete req.body.isAdmin;

       const data = await User.updateOne(customFilters, req.body, { runValidators: true } )
       res.status(202).send({
            error:false,
            data,
            new: await User.findOne(customFilters)
       })
    
    },

	delete: async (req, res) => {
           /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

       if(req.params.id != req.user._id){
           // Allows admin to delete others.
           const data = await User.deleteOne({ _id: req.params.id })
           res.status(data.deletedCount ? 204 : 404).send({
                error:!data.deletedCount,
                data,
           })
       } else {

            // Admin or users can not delete themselves.
            res.errorStatusCode = 403
            throw new Erro(' You can not remove your account !')
       }
    },
};
