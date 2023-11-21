import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import CompanyRating from "../JobSeeker/companyRating";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Grid,
  Avatar,
  Stack,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { TextField, Typography, Box } from "@material-ui/core";

const ReviewsCard = (props) => {
  console.log(props);
  console.log("Inside Reviews Card");
  const [reviews, setreviews] = useState({});
  const [openAdded, setOpenAdded] = React.useState(false);
  const [openRemoved, setOpenRemoved] = React.useState(false);
  const [showFeaturedBox, setshowFeaturedBox] = React.useState(true);

  const handleCloseAdded = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAdded(false);
  };
  const handleCloseRemoved = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRemoved(false);
  };

  const getReviewInfo = async () => {
    console.log("Fetching Reviews!");
    const data = props.review;
    console.log("Review ", data);
    setreviews({
      applicantId: data.applicantId ? data.applicantId : " ",
      reviewTitle: data.reviewTitle ? data.reviewTitle : " ",
      jobTitle: data.jobTitle ? data.jobTitle : " ",
      location: data.location ? data.location : " ",
      review: data.review ? data.review : " ",
      rating: data.rating ? data.rating : " ",
      isFeatured: data.isFeatured ? data.isFeatured : false,
      isHelpful: data.isHelpful ? data.isHelpful : " ",
      isNotHelpful: data.isNotHelpful ? data.isNotHelpful : " ",
      applicantName: data.applicantName ? data.applicantName : " ",
      ceoRating: data.ceoRating ? data.ceoRating : " ",
    });
  };

  const addAsFeatured = async () => {
    const id = props.review._id;
    console.log("Review id " + id);
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/reviews/featured?id=${id}&isFeatured=true`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setreviews((prevState) => {
            return {
              ...prevState,
              isFeatured: true,
            };
          });
          setOpenAdded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // const data = await response.json();

    // setemployerDetails(data);
  };
  const removeAsFeatured = async () => {
    const id = props.review._id;
    console.log("Review id " + id);
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/reviews/featured?id=${id}&isFeatured=false`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setreviews((prevState) => {
            return {
              ...prevState,
              isFeatured: false,
            };
          });
          setOpenRemoved(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //const data = await response.json();

    // setemployerDetails(data);
  };

  const onAddToFeaturedClicked = (event) => {
    event.preventDefault();
    //console.log(reviews);
    addAsFeatured();
  };
  const onRemoveFromFeaturedClicked = (event) => {
    event.preventDefault();
    //console.log(reviews);

    removeAsFeatured();
  };
  useEffect(() => {
    getReviewInfo();
  }, []);
  return (
    <div>
      {reviews.status !== "Approved" ? (
        <div>
          <Grid container sx={{ mt: 2, mb: 2 }}>
            <Grid item md={3}></Grid>
            <Grid style={{ margin: 10 }}>
              <Stack justifyContent="center" spacing={2} direction="row">
                <Card
                  variant="outlined"
                  style={{
                    display: "block",
                    width: "42vw",
                    margin: 15,
                    height: "28vw",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography style={{ fontSize: 15, fontWeight: 400 }}>
                      Review By : {reviews.applicantName}
                    </Typography>
                    <Typography style={{ fontSize: 14, fontWeight: 300 }}>
                      Company Rating : <CompanyRating rating={reviews.rating} />
                    </Typography>
                    <Typography style={{ fontSize: 14, fontWeight: 300 }}>
                      CEO Rating : <CompanyRating rating={reviews.ceoRating} />
                    </Typography>
                    <Typography style={{ fontSize: 14, fontWeight: 400 }}>
                      Review:
                    </Typography>

                    <Card
                      variant="outlined"
                      style={{
                        display: "block",
                        margin: 15,
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Title: {reviews.reviewTitle}
                      </Typography>
                      <Typography
                        variant="caption"
                        style={{ fontSize: 12, fontWeight: 300 }}
                      >
                        {reviews.review}
                      </Typography>
                    </Card>
                    {showFeaturedBox ? ( //Change this to false in jobSeekers Side
                      <Box>
                        {reviews.isFeatured ? (
                          <Button
                            style={{ margin: 10 }}
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={onRemoveFromFeaturedClicked}
                          >
                            Remove from Featured Reviews
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ margin: 10 }}
                            onClick={onAddToFeaturedClicked}
                          >
                            Add to Featured Reviews
                          </Button>
                        )}
                      </Box>
                    ) : null}

                    <Snackbar
                      open={openAdded}
                      autoHideDuration={2000}
                      onClose={handleCloseAdded}
                    >
                      <Alert
                        onClose={handleCloseAdded}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Added to Featured Reviews Successfully !
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      open={openRemoved}
                      autoHideDuration={2000}
                      onClose={handleCloseRemoved}
                    >
                      <Alert
                        onClose={handleCloseRemoved}
                        severity="error"
                        sx={{ width: "100%" }}
                      >
                        Removed from Featured Reviews Successfully !
                      </Alert>
                    </Snackbar>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewsCard;
