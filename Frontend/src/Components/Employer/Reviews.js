import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import EmpHeader from "./EmployersHeader";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import ReviewsCard from "./ReviewsCard";
import { useSelector } from "react-redux";

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
import EditIcon from "@mui/icons-material/Edit";

const EmployerReviews = (props) => {
  const company_id = useSelector((state) => state.login.user.id);
  console.log("The id is " + company_id);
  var allreviews = [];
  //let id = 7;
  const [reviews, setreviews] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onModalsubmit = () => {
    console.log("Modal Submitted!");
  };

  const getReviews = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/reviews/company/companyid?companyId=${company_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: session.token,
        },
      }
    );

    setreviews(await response.json());

    console.log("Reviews details", allreviews);
    allreviews.map((item) => {
      console.log("Item " + item);
    });
  };

  const onChangeHandler = (event) => {
    console.log("Here");
    const { name, value } = event.target;
    setreviews((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div>
      <EmpHeader currentTab="profile"></EmpHeader>
      <Grid container sx={{ mt: 3, mb: 3 }}>
        <Grid item md={3}></Grid>
        <Grid style={{ margin: 10 }}>
          <Stack justifyContent="center" spacing={2} direction="row">
            <Card
              variant="outlined"
              style={{
                display: "block",
                width: "42vw",
                margin: 15,
                height: "9vw",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  Company Reviews
                </Typography>
                <p></p>
                <Typography
                  variant="caption"
                  style={{ fontSize: 14, fontWeight: 400 }}
                >
                  Mark Reviews which you think should represent as your
                  Company's featured reviews!
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {reviews.length ? (
          reviews.map((item) => <ReviewsCard review={item} />)
        ) : (
          <Typography
            variant="body2"
            style={{
              width: 400,
              fontSize: 14.5,
            }}
          >
            No Reviews Yet!
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default EmployerReviews;
