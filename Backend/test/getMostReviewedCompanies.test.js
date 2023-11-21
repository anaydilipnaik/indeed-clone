describe("GET /mostreviewedcompanies", function () {
    it("Return top 5 most reviewed Companies", function (done) {
      request
        .get("/mostreviewedcompanies")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .expect(function (response) {
          expect(response.body).not.to.be.null;
        })
        .end(done);
    });
  });
  