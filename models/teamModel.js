const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    code: { type: String, },
    name: { type: String, },
    group:{type:String}
  },
  { timestamps: true }
);

const DBModel = new mongoose.model("team", DBSchema,'Teams');


module.exports = DBModel;
