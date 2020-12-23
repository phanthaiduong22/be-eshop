const jwt = require("jsonwebtoken");

const getinfo = (req, res, db) => {
  //   console.log(req.user);
  res.status(200).json(req.user);
};

module.exports = {
  getinfo: getinfo,
};
