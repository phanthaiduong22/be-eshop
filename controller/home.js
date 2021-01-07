const { response } = require("express");

const home = (req, res, db) => {
  db.select('*')
    .table('Products')
    .innerJoin('Product_Image', 'Products.id', '=', 'Product_Image.product_id')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  home: home,
};
