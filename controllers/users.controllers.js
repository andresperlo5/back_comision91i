const UserModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const CartModel = require("../models/CartSchema");
const FavsModel = require("../models/FavSchema");
const { welcomeUser } = require("../middleware/messages");

const getAllUser = async (req, res) => {
  try {
    const getUsers = await UserModel.find();
    res.status(200).json({ msg: "Usuarios Encontrados", getUsers });
  } catch (error) {
    console.log(error);
  }
};

const getAllUserDeletedTrue = async (req, res) => {
  try {
    const getUsers = await UserModel.find({ deleted: true });
    res.status(200).json({ msg: "Usuarios Encontrados", getUsers });
  } catch (error) {
    console.log(error);
  }
};

const getAllUserDeletedFalse = async (req, res) => {
  try {
    const getUsersDelFalse = await UserModel.find({ deleted: false });
    res.status(200).json({ msg: "Usuarios Encontrados", getUsersDelFalse });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    const userExist = await UserModel.findOne({
      nombreUsuario: req.body.nombreUsuario,
    });

    if (userExist) {
      return res.status(400).json({ msg: "Usuario no disponible" });
    }

    const newUser = new UserModel(req.body);
    const newCart = new CartModel({ idUser: newUser._id });
    const newFavs = new FavsModel({ idUser: newUser._id });

    const salt = bcrypt.genSaltSync(10);
    newUser.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);
    (newUser.idCart = newCart._id), (newUser.idFav = newFavs._id);

    /* const resultMessage = await welcomeUser(req.body.emailUsuario); */
    /*  const resultMessage = await welcomeUser();
    console.log(resultMessage); */
    /*  if (resultMessage === 200) { */
    await newCart.save();
    await newFavs.save();
    await newUser.save();

    res.status(201).json({ msg: "Usuario Registrado", newUser });
    /*  } else {
      res.status(400).json({ msg: "Error al crear el usuario" });
    } */
  } catch (error) {
    res.status(500).json({ msg: "Error al Crear el Usuario ", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const userExist = await UserModel.findOne({
      nombreUsuario: req.body.nombreUsuario,
    });

    if (!userExist) {
      return res
        .status(400)
        .json({ msg: "Usuario y/o contraseña no coinciden. USER" });
    } else if (userExist.deleted) {
      return res
        .status(403)
        .json({ msg: "Usuario Bloqueado. Debe comunicarse con el admin" });
    }

    const verifyPass = await bcrypt.compare(
      req.body.contrasenia,
      userExist.contrasenia
    );

    if (!verifyPass) {
      return res
        .status(400)
        .json({ msg: "Usuario y/o contraseña no coinciden. PASS" });
    }

    const payload = {
      user: {
        id: userExist._id,
        role: userExist.role,
        nombreUsuario: userExist.nombreUsuario,
        idCart: userExist.idCart,
        idFav: userExist.idFav,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
    res
      .status(200)
      .json({ msg: "Usuario logueado", token, role: userExist.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al Crear el Usuario ", error });
  }
};

const deleteLogic = async (req, res) => {
  try {
    const userDel = await UserModel.findById(req.params.id);

    if (userDel.deleted) {
      return res.status(400).json({ msg: "El usuario ya fue eliminado" });
    }

    userDel.deleted = true;
    await userDel.save();

    res.status(200).json({ msg: "usuario eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const update = await UserModel.findByIdAndUpdate(
      { _id: req.params.idUser },
      req.body,
      { new: true }
    );

    res.status(200).json({ msg: "Usuario actualizado", update });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  getAllUserDeletedTrue,
  getAllUserDeletedFalse,
  createUser,
  loginUser,
  deleteLogic,
  updateUser,
};
