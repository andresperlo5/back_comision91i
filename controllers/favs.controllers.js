const FavsModel = require("../models/FavSchema");
const ProductModel = require("../models/productSchema");

const getFav = async (req, res) => {
  try {
    const fav = await FavsModel.findOne({ _id: req.idFav });
    res.status(200).json({ msg: "Favoritos", fav });
  } catch (error) {
    console.log(error);
  }
};

const addProductFavs = async (req, res) => {
  try {
    const productExist = await ProductModel.findOne({ _id: req.params.id });
    const favsUser = await FavsModel.findById(req.idFav);

    if (!productExist) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    const prodExistFavs = favsUser.products.find(
      (product) => product._id.toString() === req.params.id
    );

    if (prodExistFavs) {
      return res.status(422).json({ msg: "Producto ya cargado en Favoritos" });
    }

    favsUser.products.push(productExist);
    await favsUser.save();

    res
      .status(200)
      .json({ msg: "Producto cargado a Favoritos con exito", favsUser });
  } catch (error) {
    console.log(error);
  }
};

const deleteProdFavs = async (req, res) => {
  try {
    const favsUser = await FavsModel.findById(req.idFav);
    const productFilter = favsUser.products.filter(
      (product) => product._id.toString() !== req.params.id
    );
    const searchProductFilter = favsUser.products.filter(
      (product) => product._id.toString() === req.params.id
    );

    if (searchProductFilter.length) {
      favsUser.products = productFilter;
      await favsUser.save();

      res.status(200).json({ msg: "Producto Eliminado" });
    } else {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFav,
  addProductFavs,
  deleteProdFavs,
};
