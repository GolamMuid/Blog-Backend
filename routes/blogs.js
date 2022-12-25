const express = require("express");
const { getBlogs } = require("../controller/blogs");
const router = express.Router();

router.route("/").get(getBlogs);

module.exports = router;
