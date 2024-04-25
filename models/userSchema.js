const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  /* emailUsuario: {
    type: String,
    required: true,
    unique: true,
  }, */
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  idCart: Types.ObjectId,
  idFav: Types.ObjectId,
});

UserSchema.methods.toJSON = function () {
  const { __v, contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UserModel = model("users", UserSchema);
module.exports = UserModel;
