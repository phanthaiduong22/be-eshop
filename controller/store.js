const getStore=(req,res,db)=>{
    db.select("*")
    .table("Store")
    .where("user_id","=",req.user.id)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(400).send("Error");
    })
};
const updatestoreinfo=(req,res,db)=>{
    db.table("Store")
    .where("user_id","=",req.user.id)
    .update({
        name:req.body.storeName,
        description:req.body.storeDesc
    })
    .then(result=>{
        res.status(200).send("OK");
    }
    )
    .catch(err=>{
        console.log(err);
        res.status(400).send("Error");
    })
}
module.exports = {
    getStore:getStore,
    updatestoreinfo:updatestoreinfo
  };