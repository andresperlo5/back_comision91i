const { Schema, model, Types } = require("mongoose");

const FavsSchema = new Schema({
  idUser: {
    type: Types.ObjectId,
  },
  products: [],
});

const FavsModel = model("favs", FavsSchema);
module.exports = FavsModel;
