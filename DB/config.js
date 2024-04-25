const mongoose = require("mongoose");

try {
  mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => console.log("DB Conectada"));
} catch (error) {
  console.log("Error DB: ", error);
}
