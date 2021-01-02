const getUser=(req,res,db)=>{
    db.table("User")
    .where({"id":req.user.id})
    .then((result)=>{
        //console.log(result);
        if(!result||!result[0]){
            res.status(400).send("User ID not found");
        }
        else{
            res.status(200).json(result[0])
        }
        
    })
}
module.exports = {
    getUser: getUser,
  };