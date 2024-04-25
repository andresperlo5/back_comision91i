const express = require("express");
const auth = require("../middleware/auth");
const {
  addProductCart,
  deleteProdCart,
  getCart,
} = require("../controllers/carts.controllers");
const route = express.Router();

route.get("/", auth("user"), getCart);
route.post("/:id", auth("user"), addProductCart);
route.delete("/:id", auth("user"), deleteProdCart);

module.exports = route;
