const asyncHandler = require("../middlewares/async");
const Blog = require("../models/Blog");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public

exports.getBlogs = asyncHandler(async (req, res, next) => {
	let query;

	// copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude
	const removeFields = ["select", "sort", "page", "limit"];

	//Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	//Create query string
	let queryStr = JSON.stringify(reqQuery);

	//Finding resources
	query = Blog.find(JSON.parse(queryStr));

	// Select Fields
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		query = query.sort("-createdAt");
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 20;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Blog.countDocuments();

	query = query.skip(startIndex).limit(limit);

	//Executing query
	const blog = await query;

	//Pagination result
	const pagination = {};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	res
		.status(200)
		.json({ success: true, count: blog.length, pagination, data: blog });
});

// @desc    Get a single blog
// @route   GET /api/v1/blog/:id
// @access  Public

exports.getBlog = asyncHandler(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);
	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: blog });
});

// @desc    Create a blog
// @route   POST /api/v1/blogs
// @access  Private

exports.createBlog = asyncHandler(async (req, res, next) => {
	// Add user to req.body

	req.body.user = req.user.id;

	const blog = await Blog.create(req.body);

	res.status(201).json({
		success: true,
		data: blog,
	});
});

// @desc    Update a single blog
// @route   PUT /api/v1/blog/:id
// @access  Private

exports.updateBlog = asyncHandler(async (req, res, next) => {
	let blog = await Blog.findById(req.params.id);

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	// Make sure user is bootcamp owner
	if (blog.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(
				`User ${req.params.id} is not authorized to execute this operation`,
				401
			)
		);
	}

	blog = await Blog.findOneAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: blog });
});

// @desc    Delete a blog
// @route   DELETE /api/v1/blog/:id
// @access  Private

exports.deleteBlog = asyncHandler(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	// Make sure user is bootcamp owner
	if (blog.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(
				`User ${req.params.id} is not authorized to execute this operation`,
				401
			)
		);
	}

	blog.remove();

	res.status(200).json({ success: true, data: {} });
});
