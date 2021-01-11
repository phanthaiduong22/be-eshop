const getProducts = (req, res, db) => {
  console.log(req.user.id);
  db.select(
    "counting as size",
    "Products.price",
    "checked",
    "product_name as name",
    "store_id",
    "Products.id"
  )
    .table("Cart")
    .join("User", "User.id", "=", "Cart.user_id")
    .join("CartItem", "CartItem.cart_id", "=", "Cart.user_id")
    .join("Products", "Products.id", "=", "CartItem.product_id")
    .join("Store", "Store.user_id", "=", "Products.store_id")
    .where({ "Cart.user_id": req.user.id })
    .andWhere("checked", "TRUE")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const getUserInfo = (req, res, db) => {
  console.log(req.user.id);
  db.select(
    "User.id",
    "User.name",
    "email",
    "phone",
    "street",
    "ward",
    "district",
    "city"
  )
    .table("User")
    .join("Address", "User.id", "=", "Address.id")
    .where({ "User.id": req.user.id })
    .then((result) => {
      res.status(200).json(result);
      console.log("result", result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const insertOder = (req, res, db) => {
  let id = 0;
  console.log(req.body);
  const orderInfo = req.body.orderInfo;
  const orderProducts = req.body.products;

  console.log(id);

  db.insert({
    transport: orderInfo.transport,
    status: orderInfo.status,
    payment: orderInfo.payment,
    user_id: orderInfo.user_id,
    totalprice: orderInfo.totalprice,
  })
    .returning("id")
    .into("Orders")
    .then(function (response) {
      const fieldsToInsert = orderProducts.map((field) => ({
        order_id: response[0],
        product_id: field.id,
        counting: field.size,
      }));
      console.log(fieldsToInsert);
      db.insert(fieldsToInsert)
        .into("OrderDetails")
        .then(function (result) {
          console.log("Success");
          res.status(200).json(result);
          console.log(result);
        });
    });

  // db('Orders')
  // .insert({
  //     transport:orderInfo.transport,
  //     status:orderInfo.status,
  //     payment:orderInfo.payment,
  //     user_id:orderInfo.user_id,
  //     totalprice:orderInfo.totalprice
  // })
  // .returning('id')
  // .then((id) => {
  //     res.status(200).json(id);
  //     id = id;
  //     console.log("iddddd  " + id);
  // })
  // .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err)}
  // );

  // db.select("last_value")
  // .table("Orders_id_seq")
  // .then((result) => {
  //     res.status(200).json(result);
  //     console.log("idddddddddddddddddddd  " + result);
  // })
  // .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err)}
  // );

  // db('OrderDetails')
  // .insert(fieldsToInsert)
  // .then((result) => {
  //     res.status(200).json(result);
  //     console.log(result);
  // })
  // .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err)}
  // );
};

const deleteCartCheckout = (req, res, db) => {
  console.log(req.body);
  db("CartItem")
    .whereIn("product_id", req.body.productids)
    .where("cart_id", "=", req.user.id)
    .del()
    .then((result) => {
      console.log("cart update status:", result);
      res.status(200).send("updated OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("failed to update delete");
    });
};

module.exports = {
  getProducts: getProducts,
  getUserInfo: getUserInfo,
  insertOder: insertOder,
  deleteCartCheckout: deleteCartCheckout,
};
