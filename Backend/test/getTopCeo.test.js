describe("GET /topCEO", function () {
    it("Return top 10 CEOs", function (done) {
      request
        .get("/topceos")
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
  