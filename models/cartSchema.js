const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema({
  idUser: {
    type: Types.ObjectId,
  },
  products: [],
});

const CartModel = model("cart", CartSchema);
module.exports = CartModel;
