const express = require("express");
const {
  createUser,
  loginUser,
  deleteLogic,
  getAllUserDeletedTrue,
  getAllUserDeletedFalse,
  getAllUser,
  updateUser,
} = require("../controllers/users.controllers");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router(); /* check, params, body, query */

router.get("/", getAllUser);
router.get("/disabledUser", getAllUserDeletedTrue);
router.get("/enabledUser", getAllUserDeletedFalse);

router.post(
  "/register",
  [
    check("nombreUsuario", "Campo NOMBRE USUARIO Vacio").notEmpty(),
    check(
      "nombreUsuario",
      "Nombre de usuario no debe ser menor a 5 caracteres ni mayor a 30"
    ).isLength({ min: 5, max: 30 }),
    check("contrasenia", "Campo CONTRASEÑA Vacio").notEmpty(),
    check(
      "contrasenia",
      "contrasenia debe tener como minimo 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  createUser
);
router.post(
  "/login",
  [
    check("nombreUsuario", "Campo NOMBRE USUARIO Vacio").notEmpty(),
    check(
      "nombreUsuario",
      "Nombre de usuario no debe ser menor a 5 caracteres ni mayor a 30"
    ).isLength({ min: 5, max: 30 }),
    check("contrasenia", "Campo CONTRASEÑA Vacio").notEmpty(),
    check(
      "contrasenia",
      "contrasenia debe tener como minimo 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  loginUser
);

router.put("/:idUser", auth("admin"), updateUser);

router.delete("/:id", auth("admin"), deleteLogic);

module.exports = router;
