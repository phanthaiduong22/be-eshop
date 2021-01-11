const getCart = (req, res, db) => {
  console.log(req.user.id);
  db.select(
    "counting",
    "Products.price",
    "checked",
    "stock",
    "product_name",
    "Store.name",
    "image_url",
    "CartItem.product_id"
  )
    .table("Cart")
    .join("User", "User.id", "=", "Cart.user_id")
    .join("CartItem", "CartItem.cart_id", "=", "Cart.user_id")
    .join("Products", "Products.id", "=", "CartItem.product_id")
    .join("Store", "Store.user_id", "=", "Products.store_id")
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
    .where({ "Cart.user_id": req.user.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const pushCart = (req, res, db) => {
  //console.log(req.user);
  console.log(req.body);
  db("CartItem")
    .where("product_id", "=", req.body.product_id)
    .where("cart_id", "=", req.user.id)
    .update({
      counting: req.body.counting,
      checked: req.body.checked,
    })
    .then((result) => {
      console.log("cart update status:", result);
      res.status(200).send("updated OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("failed to update cart item");
    });
};
const deleteCart = (req, res, db) => {
  console.log(req.body);
  db("CartItem")
    .where("product_id", "=", req.body.productid)
    .where("cart_id", "=", req.user.id)
    .del()
    .then((result) => {
      console.log("cart update status:", result);
      res.status(200).send("updated OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("failed to update cart item");
    });
};

// chinh sua add cartItem , them tham so so luong
async function addCartItem(db, req) {
  iduser = req.user.id;
  let idpr = req.body.idProduct;
  let product_price = req.body.price;
  let soluong = req.body.numPr;
  // console.log(iduser, idpr, product_price, soluong);
  // kiem tra xem trong bd co CartItem do chua ?
  await db
    .select("counting")
    .table("CartItem")
    .where({
      cart_id: iduser,
      product_id: idpr,
    })
    .then(function (data) {
      //data la 'mang' chua 'set' cac thuoc tinh
      if (data.length != 0) {
        // Neu trong Cart da co san pham
        // console.log("vo cai dau")
        // console.log(data[0].counting);
        // console.log(data)
        db.table("CartItem")
          .update({
            counting: data[0].counting + soluong,
            price: product_price * (data[0].counting + soluong),
            checked: false,
          })
          // .returning('counting', 'price')
          .where({
            cart_id: iduser,
            product_id: idpr,
          })
          .then()
          .catch((e) => console.log(e));
      } else {
        // Neu trong cart chua co san pham
        // console.log("vo cai sau")
        // console.log(data.length)
        db.table("CartItem")
          .insert(
            {
              cart_id: iduser,
              product_id: idpr,
              counting: soluong,
              price: product_price,
              checked: false,
            },
            ["counting", "price"]
          )
          // .returning('counting', 'price')
          // .then()
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));

  db.table("Products")
    .decrement("stock", soluong)
    .where({ id: idpr })
    .then()
    .catch((e) => console.log(e));

  // return db
  //   .sum("CartItem.counting as tongsohang")
  //   .sum("CartItem.price as tonggiatri")
  //   .table("CartItem")
  //   .innerJoin("Products", "CartItem.product_id", "=", "Products.id")
  //   .where({
  //     cart_id: iduser,
  //   })
  //   .then();
}

const cart = (req, res, db) => {
  if (req.query.action == "add") {
    addCartItem(db, req).then((data) => {
      return res.status(200).json(data);
      // console.log('data');
      // console.log(data);
    });
  }
};

module.exports = {
  getCart: getCart,
  pushCart: pushCart,
  deleteCart: deleteCart,
  cart: cart,
};
