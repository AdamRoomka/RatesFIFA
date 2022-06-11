const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    matchId: {type: Schema.Types.ObjectId, ref: 'match'},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    score1: {type:Number},
    score2:{type:Number},
    accepted{type:Boolean,default:false}
  },
  { timestamps: true }
);

const DBModel = new mongoose.model("guess", DBSchema,'Guesses');

module.exports = DBModel;
