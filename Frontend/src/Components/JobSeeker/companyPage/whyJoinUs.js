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

const WhyJoinUs = (props) => {
  console.log("Why Join US ", props.companyDetails);
  console.log("Inside the WhyJoinUs page!");
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
                  Why Join Us
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
                  {props.companyDetails.whyJoinUs ? (
                    <Typography
                      style={{ margin: 10, fontSize: 14, fontWeight: 500 }}
                    >
                      {props.companyDetails.whyJoinUs}
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

export default WhyJoinUs;
