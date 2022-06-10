var connection = require("mongoose");

const DB =
  "mongodb+srv://RatesFIFA:Yfr3XaJFqmUwiA9G@rates.qrk5a.mongodb.net/?retryWrites=true&w=majority";
  
  
connection
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
});

module.exports=connection;
