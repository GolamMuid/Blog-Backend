const express = require("express");
const {
	getBlogs,
	createBlog,
	getBlog,
	updateBlog,
	deleteBlog,
} = require("../controllers/blogs");
const router = express.Router();

router.route("/").get(getBlogs);
router.route("/").post(createBlog);
router.route("/:id").get(getBlog);
router.route("/:id").put(updateBlog);
router.route("/:id").delete(deleteBlog);

module.exports = router;
