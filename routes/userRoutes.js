const express = require("express");

const {
  createUser,
  getUserById
} = require("./../controllers/userController");

const router = express.Router();

router.route("/users/").patch(createUser);
router.route("/users/:id/").get(getUserById);



module.exports = router;