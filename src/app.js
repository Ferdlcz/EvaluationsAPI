//DEPENDENCES
const express = require("express");
const app = express();

//FILES
const connectDB = require("./Config/conexion");
const authRoutes = require("./Routes/AuthRoutes");
const viewUserRoutes = require("./Routes/ViewUserRoutes");

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//MIDDLEWARES
app.use(express.json());

//ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/viewusers", viewUserRoutes)