const register = (req, res, db) => {
  let { username, password } = req.body;
  console.log(username, password);
  db("User")
    .insert({
      username,
      password,
    })
    .then(() => {
      db("User")
        .select("id")
        .where("username", "=", username)
        .then((data) => {
          let id = data[0].id;
          db("Store")
            .insert({
              user_id: id,
            })
            .then((data) => console.log("created store"));
        });
      res.status(200).json("Successful Register");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unsuccessful Register");
    });
};

module.exports = {
  register: register,
};
