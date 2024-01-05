const express = require("express");

const {
  createOrUpdateGuesses,
  getAllUserGuesses,
} = require("./../controllers/guessController");

const router = express.Router();

router.route("/guesses/").post(createOrUpdateGuesses);
router.route("/guesses/").get(getAllUserGuesses);

module.exports = router;
