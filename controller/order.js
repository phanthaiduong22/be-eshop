const storeGetOrders = (req, res, db) =>{
    db.select("*")
    .table("Orders")
    .join("OrderDetails","OrderDetails.order_id","=","Orders.id")
    .join("Products","Products.id","=","OrderDetails.product_id")
    .where("Products.store_id","=",req.user.id)
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
    //.where("OrderDetails.","=",req.user.id)
    .then(result=>{
        //console.log(result);
        res.status(200).json(result)
    })
}
const pushOrder=(req, res, db) =>{
    console.log(req.body);
    db("Orders")
    .where("id","=",req.body.id)
    .update({
        status:req.body.status
    })
    .then(result=>{
        res.status(200).send("updated OK");
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send("failed to update order");
      });
};
const userGetOrder= (req, res, db)=>{
  db.select("*")
  .table("Orders")
  .join("OrderDetails","OrderDetails.order_id","=","Orders.id")
  .join("Products","Products.id","=","OrderDetails.product_id")
  .where("Orders.user_id","=",req.user.id)
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
  //.where("OrderDetails.","=",req.user.id)
  .then(result=>{
      console.log(result);
      res.status(200).json(result)
  })
}
module.exports = {
    storeGetOrders: storeGetOrders,
    pushOrder:pushOrder,
    userGetOrder:userGetOrder
  };