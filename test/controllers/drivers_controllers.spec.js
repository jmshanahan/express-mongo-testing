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
  it("should update a driver PUT /api/driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .set("Content-Type", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err => done(err))
            Driver.findOne({ email: "t@t.com" })
              .then(newDriver => {
                expect(newDriver.driving).to.be.true;
                done();
              })
              .catch(err => done(err));
        });
    });
  });
  it("should remove a driver DELETE /api/driver", done => {
    const driver = new Driver({ email: "delete@test.com", driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, res) => {
          if (err => done(err))
            Driver.findOne({ email: "delete@test.com" })
              .then(driver => {
                expect(driver).to.be.null;
                done();
              })
              .catch(err => done(err));
        });
    });
  });
});
