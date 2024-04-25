const CartModel = require("../models/CartSchema");
const ProductModel = require("../models/productSchema");

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.idCart });
    res.status(200).json({ msg: "Carrito", cart });
  } catch (error) {
    console.log(error);
  }
};

const addProductCart = async (req, res) => {
  try {
    const productExist = await ProductModel.findOne({ _id: req.params.id });
    const cartUser = await CartModel.findById(req.idCart);

    if (!productExist) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const prodExistCart = cartUser.products.find(
      (product) => product._id.toString() === req.params.id
    );

    if (prodExistCart) {
      return res.status(422).json({ msg: "Producto ya cargado en el carrito" });
    }

    cartUser.products.push(productExist);
    await cartUser.save();

    res
      .status(200)
      .json({ msg: "Producto cargado al carrito con exito", cartUser });
  } catch (error) {
    console.log(error);
  }
};

const deleteProdCart = async (req, res) => {
  try {
    const cartUser = await CartModel.findById(req.idCart);

    const productFilter = cartUser.products.filter(
      (product) => product._id.toString() !== req.params.id
    );

    const searchProductFilter = cartUser.products.filter(
      (product) => product._id.toString() === req.params.id
    );

    if (searchProductFilter.length) {
      cartUser.products = productFilter;
      await cartUser.save();

      res.status(200).json({ msg: "Producto Eliminado" });
    } else {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCart,
  addProductCart,
  deleteProdCart,
};
