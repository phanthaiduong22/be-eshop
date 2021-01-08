const { response } = require("express");

const search = (req, res, db) => {
  db.select('*')
    .table('Products')
    .leftJoin("Product_Image", function () {
      this.on("Product_Image.product_id", "=", "Products.id")
        //Chi lay 1 anh
        .andOn(
          "Product_Image.image_no",
          "=",
          db.raw(
            '(select min(image_no) from "Product_Image" where "Product_Image".product_id = "Products".id)'
          )
        );
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  search: search,
};
