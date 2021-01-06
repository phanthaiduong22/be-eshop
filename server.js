const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const cors = require("cors");
const dotenv = require("dotenv");
//
const register = require("./controller/register");
const login = require("./controller/login");
const getinfo = require("./controller/getinfo");
const authenticateToken = require("./controller/authenticateToken");
const search = require("./controller/search");
const home = require("./controller/home");
const product = require("./controller/product");
const category = require("./controller/category");
const cart = require("./controller/cart");
const postproduct = require("./controller/postproduct");
const user = require("./controller/User");
const shop = require("./controller/shop");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  home.home(req, res, db);
});

app.post("/register", (req, res) => {
  register.register(req, res, db);
});

app.post("/login", (req, res) => {
  login.login(req, res, db);
});

app.get("/getinfo", authenticateToken, (req, res) => {
  getinfo.getinfo(req, res, db);
});

app.get("/search", (req, res) => {
  search.search(req, res, db);
});

app.get("/product", (req, res) => {
  product.product(req, res, db);
});

app.get("/category", (req, res) => {
  category.category(req, res, db);
});

app.post("/cart", authenticateToken, (req, res) => {
  cart.cart(req, res, db);
});

app.get("/getcategory", (req, res) => {
  category.category(req, res, db);
});

app.post("/shop", authenticateToken, (req, res) => {
  shop.shop(req, res, db);
});

app.get("/getsellerproducts", authenticateToken, (req, res) => {
  shop.getsellerproducts(req, res, db);
});

app.post("/deletesellerproduct", authenticateToken, (req, res) => {
  shop.deletesellerproduct(req, res, db);
});

app.post("/postproduct", authenticateToken, (req, res) => {
  postproduct.postproduct(req, res, db);
});

app.get("/getcart", authenticateToken, (req, res) => {
  cart.getCart(req, res, db);
});
app.post("/pushcart", authenticateToken, (req, res) => {
  cart.pushCart(req, res, db);
});
app.get("/getUser", authenticateToken, (req, res) => {
  user.getUser(req, res, db);
});
app.delete("/deletecart", authenticateToken, (req, res) => {
  cart.deleteCart(req, res, db);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
