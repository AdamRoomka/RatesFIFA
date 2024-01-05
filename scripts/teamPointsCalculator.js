const teamModel = require("../models/teamModel");

exports.calculateTeamPoints = async (match) => {
  var team1 = await teamModel.findById(match.team1._id);
  var team2 = await teamModel.findById(match.team2._id);
  if (match.score1 > match.score2) {
    team1.score += 3;
    team1.win += 1;
    team2.lose += 1;
  }
  if (match.score1 < match.score2) {
    team2.score += 3;
    team2.win += 1;
    team1.lose += 1;
  }
  if (match.score1 === match.score2) {
    team2.draw += 1;
    team1.draw += 1;
    team1.score += 1;
    team2.score += 1;
  }
  await team1.save();
  await team2.save();
  return 1;
};
