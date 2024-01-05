const express = require("express");

const {
  createUser,
  getUserById,
  getAllUsers,
  loginUser,
  updateUser,
} = require("./../controllers/userController");

const router = express.Router();
router.route("/users/").post(createUser);
router.route("/users/login/").post(loginUser);
router.route("/users/").get(getAllUsers);
router.route("/users/:id/").post(updateUser);

module.exports = router;
