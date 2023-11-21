import React, { useState, useEffect } from "react";
import { Grid, Button, Card, CardContent } from "@material-ui/core";
import { Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import { NODE_HOST, NODE_PORT } from "../../../envConfig";
import CompanyRating from "../companyRating";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const CompanyReviewTab = ({ companyDetails }) => {
  const [filter, setFilter] = useState("h");
  const [reviews, setReviews] = useState(null);

  const handleHelpfulClick = (e, res, id, type) => {
    e.preventDefault();
    let data = {};
    data.id = id;
    if (type === "y") data.isHelpful = res;
    else data.isNotHelpful = res;
    axios
      .put(`http://${NODE_HOST}:${NODE_PORT}/reviews/update/helpfulness`, data)
      .then((res) => getReviewsFunc())
      .catch((err) => console.log(err));
  };

  const getReviewsFunc = () => {
    axios
      .get(
        `http://${NODE_HOST}:${NODE_PORT}/reviews/company/companyid?companyId=${companyDetails.id}`
      )
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getReviewsFunc();
  }, []);

  useEffect(() => {
    if (reviews) {
      let arr = reviews;
      if (filter === "h") arr.sort((a, b) => b.isHelpful - a.isHelpful);
      else if (filter === "r") arr.sort((a, b) => b.rating - a.rating);
      setReviews(arr);
    }
  }, [filter]);

  return reviews ? (
    reviews.length > 0 ? (
      <>
        <Grid container direction="row" xs={12}>
          <Grid item xs={2} />
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "20px",
                color: "#2D2D2D",
                fontWeight: "bold",
                paddingTop: "20px",
              }}
            >
              {companyDetails.companyName} Employee Reviews
            </div>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              size="large"
              style={{
                backgroundColor: "white",
                marginTop: "15px",
                width: "225px",
                height: "44px",
                textTransform: "none",
                fontWeight: "bold",
                color: "#2557A7",
                fontSize: "16px",
              }}
              onClick={() => {
                window.location.href =
                  "/postReview?companyid=" +
                  companyDetails.id +
                  "&companyname=" +
                  companyDetails.companyName;
              }}
            >
              <b>Review this company</b>
            </Button>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid container direction="row" xs={12}>
          <Grid item xs={2} />
          <Grid
            item
            container
            direction="column"
            xs={8}
            style={{
              backgroundColor: "#FAF9F8",
              height: "105px",
              marginTop: "15px",
            }}
          >
            <Grid item style={{ marginTop: "15px" }}>
              <b>Sort by</b>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                color="standard"
                value={filter}
                exclusive
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginTop: "10px" }}
              >
                <ToggleButton value="h">Helpfulness</ToggleButton>
                <ToggleButton value="r">Rating</ToggleButton>
                <ToggleButton value="d">Date</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid container>
          {reviews.map((reviews, index) => {
            let createdDate = new Date(reviews.createdAt);
            createdDate = createdDate.toLocaleString("en-US", {
              timeZone: "PST",
            });
            return (
              <div>
                <Grid container sx={{ mt: 3 }} alignItems="left">
                  <Grid item md={5}></Grid>
                  <Grid item md={6} style={{ marginLeft: 40 }}>
                    <Stack>
                      <Card
                        variant="outlined"
                        style={{
                          display: "block",
                          width: "47vw",
                          margin: 15,
                          height: "100%",
                          textAlign: "left",
                          maxHeight: "300px",
                        }}
                      >
                        <CardContent>
                          <Stack direction="row">
                            <Typography
                              style={{ fontSize: 16, fontWeight: 600 }}
                            >
                              {reviews.rating + "  "}
                              <Link to="/company?tab=reviews">
                                <CompanyRating
                                  rating={reviews.rating}
                                  color={"maroon"}
                                />
                              </Link>
                            </Typography>

                            <Typography
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                            >
                              {reviews.reviewTitle}
                            </Typography>
                          </Stack>
                          <Typography
                            sx={{ mb: 1.5 }}
                            style={{ margin: 3, fontSize: 12 }}
                          >
                            {reviews.jobTitle +
                              " - " +
                              reviews.location +
                              ", " +
                              "Written " +
                              createdDate.split(", ")[0]}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ margin: 3, marginTop: 10 }}
                          >
                            {reviews.review}
                            <br />
                          </Typography>
                        </CardContent>
                        <Grid
                          style={{ marginLeft: "15px", marginBottom: "15px" }}
                        >
                          <Typography
                            style={{
                              fontWeight: "inherit",
                              color: "#595959",
                              fontSize: ".75rem",
                              lineHeight: 1.5,
                              marginBottom: "0.25rem",
                              color: "#767676",
                            }}
                          >
                            Was this review helpful?
                          </Typography>
                          <Button
                            type="button"
                            style={{
                              width: "88.84px",
                              height: "36px",
                              backgroundColor: "#f3f2f1",
                              border: "1px solid #f3f2f1",
                              marginRight: "5px",
                            }}
                            onClick={(e) =>
                              handleHelpfulClick(
                                e,
                                reviews.isHelpful + 1,
                                reviews._id,
                                "y"
                              )
                            }
                          >
                            Yes {reviews.isHelpful}
                          </Button>
                          <Button
                            type="button"
                            style={{
                              width: "88.84px",
                              height: "36px",
                              backgroundColor: "#f3f2f1",
                              border: "1px solid #f3f2f1",
                            }}
                            onClick={(e) =>
                              handleHelpfulClick(
                                e,
                                reviews.isNotHelpful + 1,
                                reviews._id,
                                "n"
                              )
                            }
                          >
                            No {reviews.isNotHelpful}
                          </Button>
                        </Grid>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Grid>
      </>
    ) : reviews.length === 0 ? (
      <h1 style={{ fontWeight: "bold", marginTop: "25px" }}>
        No Reviews for this company yet
      </h1>
    ) : null
  ) : null;
};

export default CompanyReviewTab;
