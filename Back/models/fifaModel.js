const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const DBSchema = mongoose.Schema(
  {
    group: { type: String, },
    country: { type: String, },
    flag: { type: String, }
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const DBModel = new mongoose.model("fifa", DBSchema);

// Duomenų siuntimas į DB
// const testDBModel = new DBModel({
//   group: "A",
//   country: "Ekwador",
//   flag: "ec",
// });

// testDBModel.save();



module.exports = DBModel;