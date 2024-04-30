const { validationResult } = require("express-validator");
const ProductModel = require("../models/productSchema");
const cloudinary = require("../middleware/cloudinary");

/* GET - Obtener - R - Read */
const getProducts = async (req, res) => {
  try {
    const to = req.query.to || 0;
    const limit = req.query.limit || 100;

    const [products, count] = await Promise.all([
      ProductModel.find()
        .skip(to * limit)
        .limit(limit),
      ProductModel.countDocuments(),
    ]);

    res.status(200).json({ products, count });
  } catch (error) {
    res.status(500).json({ msg: "ERROR: Producto no encontrado", error });
  }
};

const getOneProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }

  try {
    const getProduct = await ProductModel.findOne({ _id: req.params.id });

    if (!getProduct) {
      return res.status(400).json({ msg: "Producto no existe en la DB" });
    }

    res.status(200).json({ msg: "Producto encontrado", getProduct });
  } catch (error) {
    res.status(500).json({ msg: "ERROR: Producto no encontrado", error });
  }
};

/* POST - Crear - C - Create */
const createProd = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    if (!newProduct) {
      return res.json({ msg: "ERROR: NO se creo tu producto" });
    }

    await newProduct.save();

    res.status(201).json({ msg: "Producto Creado Correctamente", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "ERROR: NO se creo tu producto", error });
  }
};

/* PUT - Actualizar - U -  Update */
const updateProd = async (req, res) => {
  try {
    const results = await cloudinary.uploader.upload(req.file.path);

    const updateProd = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      codigo: req.body.codigo,
      image: results.secure_url,
    };

    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateProd,
      { new: true }
    );

    res.status(200).json({ msg: "Producto Actualizado", updateProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "ERROR: NO se creo tu producto", error });
  }
};

/* DELETE - Borrar - D - Delete */
const deleteProd = async (req, res) => {
  try {
    const productExist = await ProductModel.findOne({ _id: req.params.id });

    if (!productExist) {
      return res.status(400).json({ msg: "ID Incorrecto" });
    }

    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto Borrado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "ERROR: NO se borro tu producto", error });
  }
};

/* Buscador */

const searchProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({
      nombre: { $regex: new RegExp(req.query.termino, "i") },
    });

    if (products.length > 1) {
      res.status(200).json({ msg: "Productos encontrados", products });
    } else {
      res.status(200).json({ msg: "Producto encontrado", products });
    }
  } catch (error) {
    console.log(error);
  }
};

const addImageProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    const imagen = await cloudinary.uploader.upload(req.file.path);

    product.image = imagen.secure_url;

    product.save();
    res.status(200).json({ msg: "Imagen cargada", product });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  createProd,
  updateProd,
  deleteProd,
  searchProduct,
  addImageProduct,
};
