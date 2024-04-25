const express = require("express");
const auth = require("../middleware/auth");
const {
  addProductFavs,
  deleteProdFavs,
  getFav,
} = require("../controllers/favs.controllers");
const route = express.Router();

route.get("/", auth("user"), getFav);
route.post("/:id", auth("user"), addProductFavs);
route.delete("/:id", auth("user"), deleteProdFavs);

module.exports = route;
