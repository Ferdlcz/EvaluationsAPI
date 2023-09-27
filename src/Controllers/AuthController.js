const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  register: async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
      //verificar si el usuario existe
      const verifyUser = await User.findOne({ username });

      if (verifyUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      //encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      //crear nuevo usuario
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role,
      });
      await newUser.save();

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.log("Error al registrar usuario", error);
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .json({
            message: "El usuario no existe o tus datos estan incorrectos!",
          });
      }

      const Password = await bcrypt.compare(password, user.password);

      if (!Password) {
        return res.status(404).json({ message: "Contraseña incorrecta" });
      }

      //Generar token

      const token = jwt.sign({ userId: user._id }, "your token", {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      console.log("Error al iniciar sesion", error);
      res.status(200).json({ message: "Error al iniciar sesion" });
    }
  },
};

module.exports = AuthController;
