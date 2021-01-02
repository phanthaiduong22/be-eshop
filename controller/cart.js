const getCart = (req, res, db) => {
    console.log(req.user.id);
    db.select("counting","Products.price","checked","stock","product_name","Store.name","image_url","CartItem.product_id")
    .table("Cart")
    .join("User","User.id","=","Cart.user_id")
    .join("CartItem","CartItem.cart_id","=","Cart.user_id")
    .join("Products","Products.id","=","CartItem.product_id")
    .join("Store","Store.user_id","=","Products.store_id")
    .leftJoin ("Product_Image",function(){
        this.on("Product_Image.product_id",'=','Products.id')
        //Chi lay 1 anh
        .andOn('Product_Image.image_no', '=', 
        db.raw('(select min(image_no) from "Product_Image" where "Product_Image".product_id = "Products".id)'))
    })
    .where({"Cart.user_id":req.user.id})
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
    res.status(400).json(err)}
    );
  };

const pushCart=(req,res,db)=>{
    //console.log(req.user);
    console.log(req.body);
    db("CartItem")
    .where("product_id","=",req.body.product_id)
    .where("cart_id","=",req.user.id)
    .update({
        counting:req.body.counting,
        checked:req.body.checked
    })
    .then((result)=>{
        console.log("cart update status:",result)
        res.status(200).send("updated OK");
    })
    .catch(err=>{
        console.log(err);
        res.status(400).send("failed to update cart item");
    })
}
const deleteCart=(req,res,db)=>{
    console.log(req.body);
    db("CartItem")
    .where("product_id","=",req.body.productid)
    .where("cart_id","=",req.user.id)
    .del()
    .then((result)=>{
        console.log("cart update status:",result)
        res.status(200).send("updated OK");
    })
    .catch(err=>{
        console.log(err);
        res.status(400).send("failed to update cart item");
    })
}
  module.exports = {
    getCart: getCart,
    pushCart:pushCart,
    deleteCart:deleteCart
  };
  