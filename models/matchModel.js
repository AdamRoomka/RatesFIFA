const mongoose = require("mongoose");

// Definiuj schemat meczu
const matchSchema = new mongoose.Schema(
  {
    team1: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    score1: { default: 0, type: Number },
    score2: { default: 0, type: Number },
    date: { type: String },
    time: { type: String },
    type: { type: String, default: "group_stage" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
