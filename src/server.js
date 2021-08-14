const express = require("express");
const dotenv = require("dotenv").config();
require("../db/db");
const blogRoutes = require("./Router/blogRoutes");

const app = express();
app.use(express.json());
app.use(blogRoutes);

app.listen("3000", () => {
  console.log("Running");
});
