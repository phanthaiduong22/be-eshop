const jwt = require("jsonwebtoken");

const posts = (req, res, db) => {
  res.json(req.user);
};

module.exports = {
  posts: posts,
};
