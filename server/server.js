require("dotenv").config();
require("../DB/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

class Servidor {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/products", require("../routes/products.routes"));
    this.app.use("/api/users", require("../routes/users.routes"));
    this.app.use("/api/carts", require("../routes/carts.routes"));
    this.app.use("/api/favs", require("../routes/favs.routes"));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("servidor levantado en el puerto: ", 3001);
    });
  }
}

module.exports = Servidor;
