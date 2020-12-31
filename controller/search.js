const { response } = require("express");

const search = (req, res, db) => {
  db.select("*")
    .table("Products")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  search: search,
};
