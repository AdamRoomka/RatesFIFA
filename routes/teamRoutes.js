const express = require("express");

const {
  getAllTeams,
  getTeamById
} = require("./../controllers/teamController");

const router = express.Router();

/**
 * @swagger
 * /teams/:
 *   get:
 *     tags: 
 *       - Teams
 *     summary: Get all teams
 *     description:
 *     responses:
 *       200:
 *         description: A all teams
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/Team'
*/
router.route("/teams/").get(getAllTeams);
/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     tags: 
 *       - Teams
 *     summary: Get team by ID
 *     description: 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of team
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single team.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/Team'
*/
router.route("/teams/:id/").get(getTeamById);


module.exports = router;