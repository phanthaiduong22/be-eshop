const postproduct = (req, res, db) => {
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
  console.log(product_image);
  db("Products")
    .insert({
      product_name,
      description,
      origin,
      stock,
      price,
      cat_id: cat,
      store_id: id,
      date_created: "2020-02-19 17:57:23",
    })
    .then((data) => {
      let id = null;
      db("Products")
        .select("*")
        .where("product_name", product_name)
        .then((data) => {
          id = data[0].id;
          db("Product_Image")
            .insert({
              image_url: product_image,
              product_id: id,
            })
            .then(() => res.status(200).json("Successful Add Product"))
            .catch((e) => console.log(e));
        });
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

module.exports = {
  postproduct: postproduct,
};
