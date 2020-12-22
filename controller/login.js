const jwt = require("jsonwebtoken");

const login = (req, res, db) => {
  let { username, password } = req.body;
  console.log(username, password);
  db("account")
    .where({ username })
    .select("password")
    .then((result) => {
      if (!result || !result[0]) {
        return res.status(400).send("Username not found");
      }
      let pass = result[0].password;
      if (password === pass) {
        // login

        const token = jwt.sign({ id: username }, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        res.cookie("token", token, { httpOnly: true });

        res.header("auth-token", token).send(token);
        // return res.status(200).send("Successful Login");
      } else {
        // failed login
        return res.status(400).send("Wrong password");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = {
  login: login,
};
