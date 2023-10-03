//DEPENDENCES
const express = require("express");
const cors = require("cors")
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
app.use(cors());

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*'); //PERMITIR TODOS LOS ORIGENES
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})

//ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/viewusers", viewUserRoutes)