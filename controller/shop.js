
function followShop(db,req){
    let iduser = req.user.id;
    let idshop = req.body.idStore;
    db.table('Follow')
    .insert({
        user_id:iduser,
        store_id:idshop
    })
    .catch(e => console.log(e))
}

const shop = (req, res, db) => {
    // console.log("shop")
    if(req.body.action == 'follow'){
      followShop(db,req);
      return res.status(200).json("Follow thanh cong")
    }
  };
  
  module.exports = {
      shop: shop,
  };