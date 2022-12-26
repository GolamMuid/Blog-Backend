const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(`MongoDB Connected: ${conn.connection.host}`.green.inverse);
};

module.exports = connectDB;
