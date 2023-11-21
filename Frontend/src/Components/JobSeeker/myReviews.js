import React, { useEffect, useState } from "react";
import MainHeader from "./mainHeader";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import { Grid, Stack, Card, CardContent, Button } from "@mui/material";
import CompanyRating from "./companyRating";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyReviews = (props) => {
  const [jobSeekerReviews, setJobSeekerReviews] = useState([]);
  const userId = useSelector((state) => state.login.user.id);

  const getJobSeekerReviews = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getJobSeekerReviews?id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: session.token,
        },
      }
    );

    const data = await response.json();

    if (data) {
      setJobSeekerReviews(data);
    }
  };

  const onClickDeleteHandler = async (reviewId) => {
    console.log("delete caled");
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/deleteReview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: reviewId,
        }),
      }
    );

    const data = await response.json();
    getJobSeekerReviews();
  };

  useEffect(() => {
    getJobSeekerReviews();
  }, []);

  return (
    <div>
      {" "}
      <MainHeader currentTab="profile"></MainHeader>
      <Grid container sx={{ mt: 3 }} alignItems="left">
        <Grid item md={3}></Grid>
        <Grid item md={6}>
          <Typography
            align="left"
            md={5}
            style={{ fontSize: 35, fontWeight: 650 }}
          >
            My reviews and contributions
          </Typography>
          <Typography
            align="left"
            md={5}
            style={{ fontSize: 18, fontWeight: 450 }}
          >
            Company reviews
          </Typography>

          <Typography align="left" style={{ fontSize: 12, fontWeight: 300 }}>
            Reviews appear on the employer's Company Page. They are never
            associated with your name, resume or job applications.
          </Typography>
        </Grid>

        {jobSeekerReviews.length === 0 ? (
          <Grid container sx={{ mt: 5 }} alignItems="center">
            <Typography
              md={5}
              style={{ fontSize: 20, fontWeight: 600, marginLeft: 330 }}
            >
              No reviews posted!
            </Typography>
          </Grid>
        ) : (
          jobSeekerReviews.map((reviews, index) => {
            let createdDate = new Date(reviews.createdAt);
            createdDate = createdDate.toLocaleString("en-US", {
              timeZone: "PST",
            });
            let isApproved = false;
            if (reviews.status === "Approved") {
              isApproved = true;
            }
            return (
              <div>
                <Grid container sx={{ mt: 3 }} alignItems="left">
                  <Grid item md={5}></Grid>
                  <Grid item md={6} style={{ marginLeft: 40 }}>
                    <Stack>
                      <Typography
                        align="left"
                        md={5}
                        style={{ fontSize: 18, fontWeight: 450 }}
                      >
                        {reviews.companyName}
                      </Typography>

                      <Card
                        variant="outlined"
                        style={{
                          display: "block",
                          width: "47vw",
                          margin: 15,
                          height: "18vw",
                          textAlign: "left",
                        }}
                      >
                        <CardContent>
                          <Stack direction="row">
                            <Typography
                              style={{ fontSize: 16, fontWeight: 600 }}
                            >
                              <Link to="/company?tab=reviews">
                                {reviews.rating + "  "}
                              </Link>

                              {isApproved ? (
                                <mark
                                  style={{
                                    backgroundColor: "lightGreen",
                                    fontSize: 10,
                                    marginRight: 250,
                                  }}
                                >
                                  Review approved-Visible on Indeed
                                </mark>
                              ) : (
                                <mark
                                  size="2"
                                  style={{
                                    backgroundColor: "yellow",
                                    fontSize: 10,
                                    marginRight: 300,
                                  }}
                                >
                                  Review is pending Approval
                                </mark>
                              )}
                              <Link to="/company?tab=reviews">
                                <CompanyRating
                                  rating={reviews.rating}
                                  color={"maroon"}
                                />
                              </Link>
                            </Typography>
                            {/* Adding white spaces */}

                            <Typography
                              style={{
                                fontSize: 15,
                                fontWeight: 400,
                              }}
                            >
                              {"Written " + createdDate.split(", ")[0]}
                            </Typography>
                          </Stack>
                          <Link to="/company?tab=reviews">
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                              style={{ margin: 3 }}
                            >
                              {reviews.reviewTitle}
                            </Typography>
                          </Link>

                          <Typography
                            sx={{ mb: 1.5 }}
                            style={{ margin: 3, fontSize: 12 }}
                          >
                            {reviews.jobTitle + " - " + reviews.location}
                          </Typography>

                          <Typography
                            variant="body2"
                            style={{ margin: 3, marginTop: 10 }}
                          >
                            {reviews.review}
                            <br />
                          </Typography>
                          <Typography
                            variant="caption"
                            style={{ fontSize: 16, fontWeight: 400 }}
                          >
                            <Button
                              variant="outlined"
                              style={{
                                textTransform: "none",
                                margin: 10,
                                fontWeight: 600,
                              }}
                              onClick={() => {
                                window.location.href =
                                  "/company?id=" +
                                  reviews.companyId +
                                  "&tab=reviews";
                              }}
                            >
                              → View on Company Page
                            </Button>
                            <Button
                              onClick={() => onClickDeleteHandler(reviews._id)}
                            >
                              <DeleteIcon style={{ color: "grey" }} />
                              <font
                                size="2"
                                style={{
                                  textTransform: "none",
                                  color: "grey",
                                }}
                              >
                                Delete{" "}
                              </font>
                            </Button>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default MyReviews;
