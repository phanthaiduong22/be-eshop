function followShop(db, req) {
  let iduser = req.user.id;
  let idshop = req.body.idStore;
  db.table("Follow")
    .insert({
      user_id: iduser,
      store_id: idshop,
    })
    .catch((e) => console.log(e));
}

const shop = (req, res, db) => {
  // console.log("shop")
  if (req.body.action == "follow") {
    followShop(db, req);
    return res.status(200).json("Follow thanh cong");
  }
};

const getsellerproducts = (req, res, db) => {
  db.table("Products")
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
    .where({ store_id: req.user.id })
    .then((result) => {
      //   console.log(result);
      if (!result || !result[0]) {
        res.status(400).send("User ID not found");
      } else {
        res.status(200).json(result);
      }
    });
};

const deletesellerproduct = (req, res, db) => {
  db("Product_Image")
    .where("product_id", req.body.image_id)
    .del()
    .catch((e) => {
      console.log(e);
    });

  db("CartItem")
    .where("product_id", req.body.image_id)
    .del()
    .catch((e) => {
      console.log(e);
    });

  db("OrderDetails")
    .where("product_id", req.body.image_id)
    .del()
    .catch((e) => {
      console.log(e);
    });

  db("Products")
    .where("id", req.body.image_id)
    .del()
    .then((data) => res.status(200).send("Delete Successful"))
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
};

module.exports = {
  shop: shop,
  getsellerproducts: getsellerproducts,
  deletesellerproduct: deletesellerproduct,
};
