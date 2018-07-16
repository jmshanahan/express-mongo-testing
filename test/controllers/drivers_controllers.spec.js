const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const { expect } = require("chai");
const app = require("app");
// It is better to do it this way then through require as mocha can include it more than once otherwise.
const Driver = mongoose.model("driver");

describe("Drivers controller::", () => {
  before(done => {
    const joe = new Driver({ email: "joe@test.com" });
    joe.save().then(() => done());
  });
  it("should create a new driver POST /api/driver", done => {
    // for Driver.countDocuments refer to mongose docs API => Model
    Driver.where({}).countDocuments((err, count) => {
      const driver = { email: "testy@test.com" };
      request(app)
        .post("/api/drivers")
        .send(driver)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) throw done(err);
          Driver.where({}).countDocuments({}, (err, newCount) => {
            if (err) done(err);
            expect(newCount).to.equal(count + 1);
            done();
          });
        });
    });
  });
});
