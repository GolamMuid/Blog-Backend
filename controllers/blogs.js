const Blog = require("../models/Blog");

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public

exports.getBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get a single blog
// @route   GET /api/v1/blog/:id
// @access  Public

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    // if (!blog) {
    //   return res.status(400).json({ success: false });
    // }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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
