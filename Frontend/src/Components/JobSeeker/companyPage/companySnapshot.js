import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
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

const CompanySnapshots = (props) => {
  console.log("Inside the CompanySnapshots page!");
  return (
    <div>
      <Grid container sx={{ mt: 3, mb: 3 }}>
        <Grid item md={3}></Grid>
        <Grid style={{ margin: 10 }}>
          <Stack justifyContent="center" spacing={1} direction="row">
            <Card
              variant="outlined"
              style={{
                width: "42vw",
                // margin: 15,
                height: "12vw",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                  {props.companyDetails.companyName}{" "}
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <Stack justifyContent="center" spacing={2} direction="row">
            <Card
              variant="outlined"
              style={{
                display: "block",
                width: "42vw",
                margin: 15,
                textAlign: "left",
              }}
            >
              <CardContent>
                <Stack direction="column">
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    About
                  </Typography>

                  {props.companyDetails.ceoName ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      CEO : {props.companyDetails.ceoName}
                    </Typography>
                  ) : null}

                  {props.companyDetails.founded ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Founded : {props.companyDetails.founded}
                    </Typography>
                  ) : null}

                  {props.companyDetails.size ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Size : {props.companyDetails.size}
                    </Typography>
                  ) : null}
                  {props.companyDetails.revenue ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Revenue : {props.companyDetails.revenue} Million
                    </Typography>
                  ) : null}

                  {props.companyDetails.industry ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Industry : {props.companyDetails.industry}
                    </Typography>
                  ) : null}
                  {props.companyDetails.desc ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Description : {props.companyDetails.desc}
                    </Typography>
                  ) : null}
                  {props.companyDetails.missionAndVision ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      Our Mission and Vision :{" "}
                      {props.companyDetails.missionAndVision}
                    </Typography>
                  ) : null}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanySnapshots;
