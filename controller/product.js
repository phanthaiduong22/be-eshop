const { response, request, json } = require("express");

function getStar(db, idPr){
  // tra ve tong so danh gia sao, togn so sao trung binh
  return db
  .sum('Ratings.stars')
  .avg('Ratings.stars')
  .table('Ratings')
  .where({
    product_id: idPr,
  }).then()
  .catch((err) => { print(err);})
}

function getComments(db, idPr){
  // tra ve comment ve san pham
  return db.select('*')
    .table('Comments')
    .where({
      product_id: idPr,
    })
    .then()
};


function getTotalOrders(db, idPr){
  // tra ve tong so luong dat hang
  return db.sum('counting')
  .table('OrderDetails')
  .where({
    product_id: idPr,
  })
  .then()
}

function getGeneralInfoProduct(db, idPr){
  // tra ve cac thong tin co ban Product
  return db.select('*')
    .table('Products')
    .where({
      product_id : idPr,
    })
    .innerJoin('Product_Image', 'Products.id', '=', 'Product_Image.product_id')
    .then()
    .catch();
}

const product = (req, res, db) => {
  console.log(req.query.action);
  if(req.query.action == 'getStar'){
    getStar(db,req.query.id).then( result => {
      res.json(result);
    });
  }else if(req.query.action == 'getComments'){
    getComments(db, req.query.id).then(result => {
      res.json(result);
    })
  }else if(req.query.action == 'getTotalOrders'){
    getTotalOrders(db, req.query.id).then(result => {
      res.json(result);
    })
  }else if(req.query.action == 'getGeneralInfoProduct'){
    getGeneralInfoProduct(db, req.query.id).then(result => {
      res.json(result);
    })
  }

};

module.exports = {
    product: product,
};
