describe("POST /filterreviews", function () {
    it("Should filter and return all approved reviews", function (done) {
      request
        .post("/filterreviews")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({filter: "Approved"})
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (response) {
          expect(response.body).not.to.be.empty;
          expect(response.body).to.be.an("array");
        })
        .end(done);
    });
  });