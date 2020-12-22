const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const cors = require("cors");
const dotenv = require("dotenv");
//
const register = require("./controller/register");
const login = require("./controller/login");
const posts = require("./controller/posts");
const authenticateToken = require("./controller/authenticateToken");
const cookieParser = require("cookie-parser");

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "123456",
    database: "eshop",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("eshop works");
});

app.post("/register", (req, res) => {
  register.register(req, res, db);
});

app.post("/login", (req, res) => {
  login.login(req, res, db);
});

app.get("/posts", authenticateToken, (req, res) => {
  posts.posts(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
