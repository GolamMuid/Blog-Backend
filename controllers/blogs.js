const asyncHandler = require("../middlewares/async");
const Blog = require("../models/Blog");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public

exports.getBlogs = asyncHandler(async (req, res, next) => {
	const blog = await Blog.find();
	res.status(200).json({ success: true, data: blog });
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
