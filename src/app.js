const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("routes/routes");
const app = express();
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  const db = require("config/keys").mongoURI;
  mongoose
    .connect(
      process.env.MONGODB_URI || db,
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongooseDB connected"))
    .catch(err => console.log(err));
}
// Ensure you add this after db connection and before routing.
app.use(bodyParser.json());

app.use("/api", routes);
// Error processing middleware needs to be included after the routes.
// Ensure that the routes forward the error with catch and next functionality.
app.use((err, req, res, next) => {
  // status 422 UNPROCESSABLE ENTITY
  res.status(422).send({ error: err.message });
});

module.exports = app;
