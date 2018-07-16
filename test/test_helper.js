const mongoose = require("mongoose");
const { mongoURITest } = require("config/keys");
// Note we have put the code in the test environment so that we have access to the done callback
// This will stop the tests from running until after the connection to the database has been established.
before(done => {
  mongoose
    .connect(
      mongoURITest,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("MongooseDB connected to test database");
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => done())
    // catch included because if we attempt to drop a collection that does not exist it will throw an exception
    // that we will need to catch and manage with a done call.
    .catch(() => done());
});
