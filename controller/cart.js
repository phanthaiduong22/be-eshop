const { response, request, json } = require("express");

async function addCartItem(db, req){
    iduser = req.user.id;
    let idpr = req.body.idProduct;
    let product_price = req.body.price;
    // kiem tra xem trong bd co CartItem do chua ?
    await db
    .select('counting')
    .table('CartItem') 
    .where({
        cart_id: iduser,
        product_id: idpr
    }).then(function(data){
        if(data.length != 0){
            console.log("vo cai dau")
            console.log(data[0].counting)
            db
            .table('CartItem')
            .update({
                
                counting: data[0].counting +1,
                price:product_price*(data[0].counting +1),
                checked:false
            })
            .where({
                cart_id:iduser,
                product_id:idpr,
            })
            .catch(e => console.log(e))
        }else{
            console.log("vo cai sau")
            console.log(data.length)
            db
            .table('CartItem')
            .insert({
                cart_id:iduser,
                product_id:idpr,
                counting: 1,
                price:product_price,
                checked:false
            }).catch(e => console.log(e))
        }
    })
    .catch(e => console.log(e));

    return db 
    .sum('CartItem.counting as tongsohang')
    .sum('CartItem.price as tonggiatri')
    .table('CartItem')
    .innerJoin('Products', 'CartItem.product_id', '=', 'Products.id')
    .where({
        cart_id : iduser
    })
    .then()  
}

const cart = (req, res, db) => {
  if(req.query.action == 'add'){
    addCartItem(db,req).then((data) => res.status(200).json(data))
  }

};

module.exports = {
    cart: cart,
};
