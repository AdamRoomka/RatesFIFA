const express = require("express");

const {
  createOrUpdateGuesses,
  getAllUserGuesses
} = require("./../controllers/guessController");

const router = express.Router();

/**
 * @swagger
 * /guesses/:
 *   post:
 *     tags: 
 *       - Guesses
 *     summary: Create guesses for user
 *     description: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                type: array
 *                properties:
 *                  score1:
 *                    type: number
 *                  score2:
 *                    type: number 
 *                  matchId:
 *                    type: string
*/
router.route("/guesses/").post(createOrUpdateGuesses);

router.route("/guesses/").get(getAllUserGuesses);

module.exports = router;