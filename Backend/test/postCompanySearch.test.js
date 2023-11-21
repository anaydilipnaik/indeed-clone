describe("POST /companysearch", function () {
    it("Should Search and return the company", function (done) {
      request
        .post("/companysearch")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({search: "Amazon"})
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (response) {
          expect(response.body).not.to.be.empty;
          expect(response.body).to.be.an("array");
        })
        .end(done);
    });
  });