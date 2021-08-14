const express = require("express");
const Blog = require("../models/blog");
const route = express.Router();

//Route to create Blog Post
route.post("/", async (req, res) => {
  const createBlog = await new Blog(req.body);
  try {
    await createBlog.save();
    res.status(201).send(createBlog);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Route to get All Blog Post's
route.get("/get", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Route to get individual Blog Post by ID
route.get("/get/:id", async (req, res) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Route to update individual Blog Post
route.put("/updateblog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.content = req.body.content || blog.content;
      blog.author = req.body.author || blog.author;
    }
    const updatedBlog = await blog.save();
    res.status(200).send(updatedBlog);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Route to delete specified Blog Post
route.delete("/deleteblog/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = route;
