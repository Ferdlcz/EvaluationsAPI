const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/EvaluationsAPI", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "La conexion a la base de datos ha sido establecida correctamente"
    );
  } catch (err) {
    console.log("Error al conectar a la base de datos", err);
    throw err;
  }
};

module.exports = connectDB;
