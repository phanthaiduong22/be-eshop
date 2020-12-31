const { defaults } = require("pg");

const postproduct = (req, res, db) => {
  console.log(req.body);
  let { id } = req.user;
  console.log(id);
  let {
    product_name,
    description,
    origin,
    stock,
    price,
    cat,
    product_image,
  } = req.body;
  let lastID = 1;
  db("Products")
    .select("id")
    .orderBy("id", "desc")
    .limit(1)
    .then((data) => {
      lastID = data[0].id;
      db("Products")
        .insert({
          id: lastID + 1,
          product_name,
          description,
          origin,
          stock,
          price,
          cat_id: cat,
          store_id: id,
          date_created: "2020-02-19 17:57:23",
        })
        .then((data) => res.status(200).json("Successful Add Product"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  postproduct: postproduct,
};
