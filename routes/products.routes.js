const express = require("express");
const {
  getProducts,
  getOneProduct,
  createProd,
  updateProd,
  deleteProd,
  searchProduct,
  addImageProduct,
} = require("../controllers/products.controllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const multer = require("../middleware/multer");
const router = express.Router();
/* endpoint - ruta + controlador */

router.get("/search", searchProduct);

router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneProduct
);
router.get("/", getProducts);

router.post("/", createProd);
router.post("/addImage/:idProd", multer.single("image"), addImageProduct);

router.put("/:id", multer.single("image"), updateProd);
router.delete("/:id", deleteProd);

module.exports = router;
