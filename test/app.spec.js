const assert = require("assert");
const request = require("supertest");
const { expect } = require("chai");
const app = require("app");

describe("The express app", () => {
  it("handles a GET request to /api", done => {
    request(app)
      .get("/api")
      .expect(200)
      .expect(res => {
        expect(res.body).to.include({ hi: "There" });
      })
      .end(done);
  });
});
