const express = require("express");
const { getAllTeams, getTeamById } = require("./../controllers/teamController");

const router = express.Router();

router.route("/teams/").get(async (req, res) => {
  try {
    const results = await teams.find().sort({ score: "desc" });
    io.emit("teamsData", {
      results: teams.length,
      data: {
        teams: results,
      },
    });

    res.status(200).json({
      results: teams.length,
      data: {
        teams: results,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.route("/teams/:id/").get(async (req, res) => {
  try {
    const results = await teams.findById(req.params.id);
    io.emit("teamDataById", {
      data: {
        teams: results,
      },
    });

    res.status(200).json({
      data: {
        teams: results,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
