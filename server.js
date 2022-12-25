const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

// importing routes
const blogs = require("./routes/blogs");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/v1/blogs", blogs);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .inverse
  )
);