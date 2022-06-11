const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    team1: {type: mongoose.Schema.Types.ObjectId, ref: 'country'},
    team2: {type: mongoose.Schema.Types.ObjectId, ref: 'country'},
    score1: {default:0,type:Number},
    score2: {default:0,type:Number},
    time : { type : Date }
  },
  { timestamps: true }
);

const DBModel = new mongoose.model("match", DBSchema,'Matches');

module.exports = DBModel;
