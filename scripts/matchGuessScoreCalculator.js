const guessModel = require("../models/guessModel");
const userModel = require("../models/userModel");

exports.calculateMatchGuesses = async (match) => {
  const guesses = await guessModel.find({ matchId: match._id });
  var userGainedPoints = [];
  var gainedPoints = 0;
  guesses.forEach((guess) => {
    console.log("GUESS: " + guess.score1 + " : " + guess.score2);
    console.log("MATCH: " + match.score1 + " : " + match.score2);

    gainedPoints = calculateUserPoints(
      match.score1,
      match.score2,
      guess.score1,
      guess.score2
    );
    userGainedPoints.push({ id: guess.userId, points: gainedPoints });

    console.log("POINTS: " + gainedPoints);
  });

  userGainedPoints.forEach(async (user) => {
    console.log("searching for: " + user.id);
    var userInst = await userModel.findById(user.id);
    console.log(userInst.name + " gained " + user.points + " points");
    userInst.score += user.points;
    await userInst.save();
  });

  return 1;
};

function calculateUserPoints(score1, score2, guess1, guess2) {
  var gainedPoints = 0;
  if (guess1 === score1 && guess2 === score2) {
    gainedPoints = 15;
  } else if (
    (score1 === score2 && guess1 === guess2) ||
    (score1 - score2 > 0 && guess1 - guess2 > 0) ||
    (score1 - score2 < 0 && guess1 - guess2 < 0)
  ) {
    gainedPoints = 10 - Math.abs(guess1 - score1) - Math.abs(guess2 - score2);
  } else {
    gainedPoints = 0 - Math.abs(guess1 - score1) - Math.abs(guess2 - score2);
  }
  return gainedPoints;
}

exports.calculateUserGainedPoints = calculateUserPoints;
