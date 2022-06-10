const mongoose = require("mongoose");
const app = require("./app");


const DB =
  "mongodb+srv://RatesFIFA:Yfr3XaJFqmUwiA9G@rates.qrk5a.mongodb.net/?retryWrites=true&w=majority";
  
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });


const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
