const User = require("../Models/UserModel");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log("Error al obtener a los usuarios", error);
      res
        .status(500)
        .json({ message: "Error al obtener a los usuarios", error });
    }
  },
};

module.exports = UserController;
