const { response } = require("express");

const category = (req, res, db) => {
  db.select('*')
    .table('Category')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
    category: category,
};
