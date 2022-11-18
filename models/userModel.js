const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    name: {type:String},
    email: {type:String},
    login: {type:String},
    password: {type:String},
    score: {type:Number,default:0},
    role: {type:String,default:"user"},
    token: { type: String }
  },
  { timestamps: true }
);

const DBModel = new mongoose.model("user", DBSchema,'Users');

module.exports = DBModel;
