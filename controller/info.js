const pushUserInfo = (req, res, db) => {
  console.log(req.body.password);
  db("User")
    .where("id", "=", req.body.id)
    .update({
      password: req.body.password,
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      sex: req.body.sex,
      birthdate: req.body.birthdate,
    })
    .then((result) => {
      console.log("user update status:", result);
      res.status(200).send("updated OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("failed to update user");
    });
};

const getInfo = (req, res, db) => {
  console.log(req.user.id);
  db.select(
    "User.id",
    "User.name",
    "email",
    "phone",
    "password",
    "birthdate",
    "sex"
  )
    .table("User")
    .where({ "User.id": req.user.id })
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  pushUserInfo: pushUserInfo,
  getInfo: getInfo,
};
