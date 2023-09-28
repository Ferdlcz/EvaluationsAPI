//DEPENDENCES
const express = require("express");
const router = express.Router();

//FILES
const AuthController = require("../Controllers/AuthController");

//Routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
