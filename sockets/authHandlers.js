const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function registerUser(data, socket) {
  const { name, email, login, password, role } = data;

  try {
    if (name === undefined) {
      socket.emit("registerResponse", {
        success: false,
        error: "Name is not defined.",
      });
      return;
    }
    if (email === undefined) {
      socket.emit("registerResponse", {
        success: false,
        error: "Email is not defined.",
      });
      return;
    }
    if (login === undefined) {
      socket.emit("registerResponse", {
        success: false,
        error: "Login is not defined.",
      });
      return;
    }
    if (password === undefined) {
      socket.emit("registerResponse", {
        success: false,
        error: "Password is not defined.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(password, salt);

    let newUserObject = {
      login: login,
      name: name,
      email: email,
      password: pass,
    };

    if (role !== undefined) {
      newUserObject.role = role;
    }

    user = await UserModel.create(newUserObject);

    const token = await jwt.sign(
      { user_id: user._id, role: user.role, login: login, name: name },
      process.env.TOKEN_KEY
    );

    user.token = token;

    user.save(function (err, user) {
      if (err) return console.log(err);
    });

    socket.emit("registerResponse", {
      success: true,
      status: "success",
      code: "USER_CREATED",
      message: "Rejestracja udana!",
    });
    console.log("rejestracja udana");
  } catch (error) {
    console.log("error: ", error);
    socket.emit("registerResponse", { success: false, error: error.message });
  }
}

async function loginUserSocket(socket, data, io) {
  const { login, password } = data;

  try {
    let user = await UserModel.find({ login: login });
    if (user.length === 0) {
      socket.emit("loginResponse", { success: false, error: "Not defined." });
      return;
    }
    user = user[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      socket.emit("loginResponse", {
        success: false,
        error: "Niepoprawne haslo.",
      });
      return;
    }

    socket.emit("loginResponse", {
      success: true,
      message: "logowanie udane",
      token: user.token,
      role: user.role,
    });

    user.isActive = true;
    await user.save();

    socket.emit("isActive", { userId: data.userId, isActive: true });
  } catch (error) {
    socket.emit("loginResponse", { success: false, error: error.message });
    console.log("NIEUDANE", error.message);
  }
}

module.exports = { registerUser, loginUserSocket };
