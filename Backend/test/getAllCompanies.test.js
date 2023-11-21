describe("GET /allCompaniesInSystem", function () {
    it("Return all companies in the system", function (done) {
      request
        .get("/allcompanies")
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
  