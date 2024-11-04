const Blogs = require("../model/BlogMode");

exports.createBlogs = async (req, res) => {
  try {
    const { title, content,imageUrl } = req.body;
     // Cloudinary URL after upload
console.log(imageUrl)
    if (!title || !content || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBlog = new Blogs({ title, content, imageUrl });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
  };

  exports.getBlogs = async (req, res) => {
    try {
      const blogs = await Blogs.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  };
  exports.getSpecificBlogs = async (req, res) => {
    try {
      const blogs = await Blogs.findOne({_id:req.params.id});
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  };
  exports.deleteBlogs= async (req, res) => {
    try {
      console.log(req.params.id)
      const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  };