const getProducts = (req, res, db) => {
    console.log(req.user.id);
    db.select("counting","Products.price","checked","product_name","Store.name")
    .table("Cart")
    .join("User","User.id","=","Cart.user_id")
    .join("CartItem","CartItem.cart_id","=","Cart.user_id")
    .join("Products","Products.id","=","CartItem.product_id")
    .join("Store","Store.user_id","=","Products.store_id")
    .where({"Cart.user_id":req.user.id})
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err)}
    );
  };

  module.exports = {
    getProducts: getProducts
  };