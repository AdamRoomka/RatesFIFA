const express = require("express");

const {
  createUser,
  getUserById,
  getAllUsers,
  loginUser,
  updateUser
} = require("./../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /users/:
 *   post:
 *     tags: 
 *       - Users
 *     summary: Create user
 *     description: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/definitions/User'
*/
router.route("/users/").post(createUser);
/**
 * @swagger
 * /users/login/:
 *   post:
 *     tags: 
 *       - Users
 *     summary: Login user
 *     description: 
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                login:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
*/
router.route("/users/login/").post(loginUser);
/**
 * @swagger
 * /users/:
 *   get:
 *     tags: 
 *       - Users
 *     summary: Get all users
 *     description:
 *     responses:
 *       200:
 *         description: Get all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name:
 *                  type: string
 *                score:
 *                  type: number
*/
router.route("/users/").get(getAllUsers);

router.route("/users/:id/").post(updateUser);

module.exports = router;