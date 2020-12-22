const register = (req, res, db) => {
  let { username, password } = req.body;
  console.log(username, password);
  db("account")
    .insert({
      username,
      password,
    })
    .then(() => res.status(200).json("Successful Register"))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unsuccessful Register");
    });
};

module.exports = {
  register: register,
};
