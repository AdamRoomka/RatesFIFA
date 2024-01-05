const mongoose = require("mongoose");

const DB =
  "mongodb+srv://RatesFIFA:Yfr3XaJFqmUwiA9G@rates.qrk5a.mongodb.net/?retryWrites=true&w=majority";

const connection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.error("Error connecting to DB:", err));

module.exports = connection;
