const Blogs = require("../model/BlogMode");

exports.createBlogs = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file?.path;  // Cloudinary URL after upload
console.log(imageUrl)
    if (!title || !content || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBlog = new Blog({ title, content, imageUrl });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
  };