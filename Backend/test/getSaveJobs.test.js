describe("POST /getSaveJob", function () {
  it("Should return the correct applicantId and JobId details when job is saved or un-saved", function (done) {
    request
      .post("/getSaveJob")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ jobId: 1, applicantId: 1 })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
      })
      .end(done);
  });
});
