const express = require("express");
const {
	getBlogs,
	createBlog,
	getBlog,
	updateBlog,
	deleteBlog,
} = require("../controllers/blogs");
const router = express.Router();

const { protect } = require("../middlewares/auth");

router.route("/").get(getBlogs);
router.route("/").post(protect, createBlog);
router.route("/:id").get(getBlog);
router.route("/:id").put(protect, updateBlog);
router.route("/:id").delete(protect, deleteBlog);

module.exports = router;
