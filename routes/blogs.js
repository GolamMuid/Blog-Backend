const express = require("express");
const { getBlogs, createBlog, getBlog } = require("../controllers/blogs");
const router = express.Router();

router.route("/").get(getBlogs);
router.route("/").post(createBlog);
router.route("/:id").get(getBlog);

module.exports = router;
