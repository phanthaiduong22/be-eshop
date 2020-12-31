const { response } = require("express");

const getcategory = (req, res, db) => {
  db.select("*")
    .table("Category")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getcategory: getcategory,
};
