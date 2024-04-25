const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  codigo: {
    unique: true,
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
