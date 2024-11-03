// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blogs = mongoose.model("Blog", blogSchema);
module.exports = Blogs;

