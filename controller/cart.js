const getCart = (req, res, db) => {
    console.log(req.user.id);
    db.select("counting","Products.price","checked","stock","product_name","Store.name","image_url")
    .table("Cart")
    .join("User","User.id","=","Cart.user_id")
    .join("CartItem","CartItem.cart_id","=","Cart.user_id")
    .join("Products","Products.id","=","CartItem.product_id")
    .join("Store","Store.user_id","=","Products.store_id")
    .leftOuterJoin ("Product_Image","Product_Image.product_id","=","Products.id")
    .where({"Cart.user_id":req.user.id})
    .then((result) => {
        console.log(result);
        if(!result || !result[0]){
            //No cart yet
            res.status(200).send("No cart")
        }
        else{
            res.status(200).json(result)
        }
        
        
    })
    .catch((err) => {
        console.log(err);
    res.status(400).json(err)}
    );
  };
  
  module.exports = {
    getCart: getCart,
  };
  