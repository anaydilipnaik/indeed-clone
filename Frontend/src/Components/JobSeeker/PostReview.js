import React, { useState } from "react";
import MainHeader from "./mainHeader";
import { Grid } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Rating from "@mui/material/Rating";
import SuccessConfirmation from "./apply/SuccessConfirmation";
import axios from "axios";
import { NODE_HOST, NODE_PORT } from "../../envConfig";

const PostReview = (props) => {
  const [reviewTitle, setReviewTitle] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [ceoRating, setCeoRating] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!rating || !ceoRating) setError(true);
    else {
      let data = {};
      data.applicantId = props.user.id;
      data.companyId = parseInt(companyId);
      data.companyName = companyName;
      data.applicantName = props.user.firstName + " " + props.user.lastName;
      data.reviewTitle = reviewTitle;
      data.jobTitle = jobTitle;
      data.location = location;
      data.review = review;
      data.rating = rating;
      data.ceoRating = ceoRating;
      data.status = "Pending";
      axios
        .post(`http://${NODE_HOST}:${NODE_PORT}/postReview`, data)
        .then((res) => {
          if (res.data === "Success") setSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const search = useLocation().search;
  const companyId = new URLSearchParams(search).get("companyid");
  const companyName = new URLSearchParams(search).get("companyname");

  return (
    <div>
      <MainHeader currentTab="companyReviews" />
      {success ? (
        <SuccessConfirmation review={true} />
      ) : (
        <Grid
          container
          direction="row"
          style={{
            backgroundColor: "#FAF9F8",
            minHeight: "725px",
          }}
        >
          <Grid item xs={3} />
          <Grid
            item
            xs={6}
            style={{
              marginTop: "50px",
              backgroundColor: "#FFF",
              marginBottom: "50px",
              padding: "50px",
            }}
          >
            <React.Fragment>
              <Typography
                variant="h5"
                style={{ textAlign: "left", fontWeight: "bold" }}
              >
                Submit a Review
              </Typography>
              <form onSubmit={onSubmit}>
                <Grid container style={{ marginTop: "15px" }}>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <TextField
                      required
                      id="reviewTitle"
                      name="reviewTitle"
                      label="Review Summary"
                      fullWidth
                      autoComplete="given-name"
                      variant="outlined"
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item container direction="row" xs={12}>
                    <Grid
                      item
                      xs={6}
                      style={{ marginBottom: "15px", paddingRight: "10px" }}
                    >
                      <TextField
                        required
                        id="jobTitle"
                        name="jobTitle"
                        label="Your Role"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: "15px" }}>
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Your Location"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <TextField
                      required
                      id="review"
                      name="review"
                      label="Review"
                      multiline
                      rows={4}
                      fullWidth
                      autoComplete="family-name"
                      variant="outlined"
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    style={{ marginBottom: "15px", textAlign: "left" }}
                  >
                    <Grid item xs={3}>
                      <Typography component="legend">
                        <b>Overall Rating</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    style={{ marginBottom: "15px", textAlign: "left" }}
                  >
                    <Grid item item xs={3}>
                      <Typography component="legend">
                        <b>CEO Rating</b>
                      </Typography>
                    </Grid>
                    <Grid item item xs={9}>
                      <Rating
                        name="simple-controlled"
                        value={ceoRating}
                        onChange={(event, newValue) => {
                          setCeoRating(newValue);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={{ marginTop: "50px" }}
                    >
                      Submit
                    </Button>
                    {error ? (
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "red",
                          marginTop: "10px",
                        }}
                      >
                        Please fill in all the fields
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </form>
            </React.Fragment>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {})(PostReview);
