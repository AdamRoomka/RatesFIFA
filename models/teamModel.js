const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    code: { type: String, default:0},
    name: { type: String, },
    group:{type:String},
    score: {type:Number,default:0},
    lose: {type:Number,default:0},
    win: {type:Number,default:0},
    draw: {type:Number,default:0}
  },
  { timestamps: true }
);

const DBModel = new mongoose.model("team", DBSchema,'Teams');

module.exports = DBModel;
