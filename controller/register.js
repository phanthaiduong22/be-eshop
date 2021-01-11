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
          db("Cart")
            .select("*")
            .where("user_id", "=", id)
            .then((data) => {
              if (data.length === 0)
                db("Cart")
                  .insert({ user_id: id, price: 0 })
                  .then((data) => console.log("created cart"));
            });
          db("Address")
            .select("*")
            .where("id", "=", id)
            .then((data) => {
              db("Address")
                .insert({
                  id: id,
                  street: "227 Nguyễn Văn Cừ",
                  ward: "Phường 4",
                  district: "Quận 5",
                  city: "Tp. Hồ Chi Minh",
                })
                .then((data) => console.log("created Address"));
            });
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
