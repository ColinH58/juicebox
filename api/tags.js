const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
    const tags = await getAllTags();
  
    res.send({ tags });
  });
  
  tagsRouter.get("/:tagName/posts", async (req, res, next) => {
    let { tagName } = req.params;
    tagName = decodeURIComponent(tagName);
    try {
      const allPosts = await getPostsByTagName(tagName);
      const posts = allPosts.filter((post) => {
        return (
          post.active ||
          (req.user && req.user.id && post.author.active === post.author.id)
        );
      });
      res.send({ posts });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  module.exports = tagsRouter;