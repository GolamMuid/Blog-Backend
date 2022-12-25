exports.getBlogs = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all blogs" });
};
