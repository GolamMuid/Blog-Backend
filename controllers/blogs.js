const Blog = require("../models/Blog");

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public

exports.getBlogs = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all blogs" });
};

// @desc    Create a blog
// @route   POST /api/v1/blogs
// @access  Private

exports.createBlog = async (req, res, next) => {
  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    data: blog,
  });
};
