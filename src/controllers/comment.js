"use strict";
/* ______________ Comment Controller ______________ */
const Comment = require("../models/comment");

module.exports = {
	create: async (req, res) => {
		/*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */

		const data = await Comment.create(req.body);
		res.status(201).send({
			error: false,
			data,
		});
	},

	read: async (req, res) => {
		/*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments or Get Single Comment"
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
			// Get Single Comment
			const data = await Comment.findOne({ _id: req.params.id }).populate([
				{ path: "userId", select: "username email" }, // need control from fe
				{path: "blogId", select: "title",populate: { path: "categoryId" },populate: { path: "userId", select: "username email" }}, // check here ??
			]
			);
			res.status(200).send({
				error: false,
				data,
			});
		} else {
			// List Comments
			const data = await res.getModelList(Comment, {}, [
				{ path: "userId", select: "username email" }, // need control from fe
				{path: "blogId", select: "title",populate: { path: "categoryId" },populate: { path: "userId", select: "username email" }}, // check here ??
			]);
			res.status(200).send({
				error: false,
				details: await res.getModelListDetails(Comment),
				data,
			});
		}
	},

	update: async (req, res) => {
		/*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Comment 1"
                }
            }
        */
        const customFilters = req.user?.isAdmin ? {_id:req.params.id} : { _id: req.user._id };


		const data = await Comment.updateOne(customFilters, req.body, {
			runValidators: true,
		});
		res.status(202).send({
			error: false,
			data,
			new: await Comment.findOne(customFilters),
		});
	},

	delete: async (req, res) => {
		/*
         #swagger.tags = ["Comments"]
         #swagger.summary = "Delete Comment"
     */

		if (req.params.id == req.user._id) {
			// Allows admin to delete others.
			const data = await Comment.deleteOne({ _id: req.params.id });
			res.status(data.deletedCount ? 204 : 404).send({
				error: !data.deletedCount,
				data,
			});
		} else {
			// Admin or users can not delete themselves.
			res.errorStatusCode = 403;
			throw new Erro(" You can not remove other's comment !");
		}
	},
};
