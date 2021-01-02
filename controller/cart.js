const { response, request, json } = require("express");

function addCartItem(db, req){
    console.log("hieu")
    console.log(req.body)
    let {idpr,product_price} = req.body ;
    iduser = req.user.id;
    // kiem tra xem trong bd co CartItem do chua ?
    db
    .select('counting')
    .table('CartItem') 
    .where({
        cart_id: iduser,
        product_id: idpr
    }).then(function(data){
        if(data != null){
            db
            .table('CartItem')
            .insert({
                card_id:iduser,
                product_id:idpr,
                counting: data +1,
                price:product_price*counting,
                checked:false
            })
        }else{
            db
            .table('CartItem')
            .insert({
                card_id:iduser,
                product_id:idpr,
                counting: 1,
                price:product_price,
                checked:false
            })
        }
    })


    // 

    
}

const cart = (req, res, db) => {
    console.log("vo ham cart")
  if(req.query.action == 'add'){
    addCartItem(db,req);
    return res.status(200).json("hieu map beo nhue hwo")
  }

};

module.exports = {
    cart: cart,
};
