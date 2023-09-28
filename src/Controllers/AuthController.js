const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

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
      const salt = await bcrypt.genSalt(10);
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

    const generateRandomKey = (length) => {
      return crypto.randomBytes(length).toString('hex');
    };
    
    // Genera una clave secreta de 32 caracteres (256 bits)
    const secretKey = generateRandomKey(16);

    try {

      // Verificar si el usuario existe
      const user = await User.findOne({ username });

      // Enviar status 404 si el usuario no existe
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar si la contraseña es correcta
      const isPasswordValid = await bcrypt.compare(password, user.password);

      //Enviar status 401 si la contraseña es incorrecta
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Crear token de autenticación
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      //verificar que los datos se esten enviando correctamente
      console.log('Username: ', user.username);
      console.log('Email: ', user.email);
      console.log('Role: ', user.role);


      res.status(200).json({ message: 'Has iniciado sesion correctamente!!', token });
    } catch (error) {
      console.log('Error al intentar iniciar sesión', error);
      res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }
  }
 

};
module.exports = AuthController;