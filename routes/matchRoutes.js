const express = require("express");

const {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
} = require("./../controllers/matchController");
const router = express.Router();

/**
 * @swagger
 * /matches/:
 *   post:
 *     tags: 
 *       - Matches
 *     summary: Create match
 *     description: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/definitions/Match'
*/
router.route("/matches/").post(createMatch)
/**
 * @swagger
 * /matches/:
 *   get:
 *     tags: 
 *       - Matches
 *     summary: Get all matches
 *     description:
 *     responses:
 *       200:
 *         description: Get all matches.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/Match'
*/
router.route("/matches/").get(getAllMatches)
/**
 * @swagger
 * /matches/{id}:
 *   get:
  *     tags: 
 *       - Matches
 *     summary: Get match by ID
 *     description: 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/Match'
*/
router.route("/matches/:id/").get(getMatchById)
/**
 * @swagger
 * /matches/{id}:
 *   post:
 *     tags: 
 *       - Matches
 *     summary: Update match
 *     description: 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                score1:
 *                  type: number
 *                score2:
 *                  password: number
*/
router.route("/matches/:id/").post(updateMatch)

router.route("/matches/:id/").delete(deleteMatch)

module.exports = router;
