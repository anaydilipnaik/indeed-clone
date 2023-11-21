describe("GET /getJobSeekerReviews?id=1", function () {
  it("Should return the correct applicant id of all reviews posted by the job Seeker", function (done) {
    request
      .get("/getJobSeekerReviews?id=1")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ id: "1" })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (response) {
        expect(response.body).not.to.be.null;
        let responseArray = response.body.filter((element) => {
          if (element.applicantId !== 1) return element;
        });
        assert.strictEqual(responseArray.length, 0);
      })
      .end(done);
  });
});
