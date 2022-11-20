const express = require("express");

const {
  continues,
} = require("./../controllers/continueController");
const router = express.Router();

router.route("/").get(continues);