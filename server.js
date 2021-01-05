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
const getcategory = require("./controller/getcategory");
const postproduct = require("./controller/postproduct");
const cart=require("./controller/cart");
const user=require("./controller/User");
const cookieParser = require("cookie-parser");
const checkout = require("./controller/checkout");

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
  res.send("eshop works");
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

app.get("/getcategory", (req, res) => {
  getcategory.getcategory(req, res, db);
});

app.post("/postproduct", authenticateToken, (req, res) => {
  postproduct.postproduct(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

app.get("/getcart",authenticateToken,(req,res)=>{
  cart.getCart(req,res,db)
})
app.post("/pushcart",authenticateToken,(req,res)=>{
  cart.pushCart(req,res,db)
})
app.get("/getUser",authenticateToken,(req,res)=>{
  user.getUser(req,res,db);
})
app.delete("/deletecart",authenticateToken,(req,res)=>{
  cart.deleteCart(req,res,db);
})

app.get("/checkout/getProducts", authenticateToken, (req, res)=>{
  checkout.getProducts(eq,res,db);
})