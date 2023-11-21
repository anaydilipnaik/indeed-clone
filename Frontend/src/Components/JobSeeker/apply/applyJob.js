import React, { useEffect, useState } from "react";
import MainHeader from "../mainHeader";
import { Grid } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { applyJob } from "../../../controllers/jobs";
import SuccessConfirmation from "./SuccessConfirmation";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import JobDescriptionCard from "./JobDescriptionCard";
import axios from "axios";
import { NODE_HOST, NODE_PORT } from "../../../envConfig";

const ApplyJob = (props) => {
  const Input = styled("input")({
    display: "none",
  });

  const [resumeURI, setResumeURI] = useState(null);
  const [successConfirmation, setSuccessConfirmation] = useState(false);
  const [validation, setValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [jobDetails, setJobDetails] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (resumeURI) {
      setSubmitted(true);
      const data = new FormData();
      data.append("applicantId", props.user.id);
      data.append("jobId", parseInt(new URLSearchParams(search).get("jobid")));
      data.append("resumeURI", resumeURI);
      data.append("status", "s");
      applyJob(data)
        .then((res) => {
          if (res.data === "Success") {
            setSuccessConfirmation(true);
            setSubmitted(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setSubmitted(false);
        });
    } else setValidation(true);
  };

  const search = useLocation().search;

  useEffect(() => {
    const jobid = new URLSearchParams(search).get("jobid");
    if (jobid) {
      axios
        .get(`http://${NODE_HOST}:${NODE_PORT}/jobdetails/get/` + jobid)
        .then((res) => setJobDetails(res.data[0]))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <MainHeader />
      {successConfirmation ? (
        <SuccessConfirmation />
      ) : (
        <Grid container direction="row">
          <Grid
            item
            xs={7}
            style={{
              paddingLeft: "200px",
              paddingRight: "200px",
              marginTop: "50px",
            }}
          >
            <React.Fragment>
              <Typography
                variant="h5"
                style={{ textAlign: "left", fontWeight: "bold" }}
              >
                Application Details
              </Typography>
              <form onSubmit={onSubmit}>
                <Grid container style={{ marginTop: "15px" }}>
                  <Grid
                    item
                    container
                    direction="row"
                    xs={12}
                    style={{ marginBottom: "15px" }}
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        defaultValue={props.user.firstName}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        defaultValue={props.user.lastName}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    xs={12}
                    style={{ marginBottom: "15px" }}
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="phone"
                        name="phoneNo"
                        label="Phone No."
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        defaultValue={props.user.phoneNo}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        defaultValue={props.user.email}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    style={{ marginBottom: "15px", textAlign: "left" }}
                  >
                    <Grid item>
                      <Typography
                        style={{ fontWeight: "bold", marginRight: "25px" }}
                      >
                        Upload your resume *
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        type="file"
                        id="resume"
                        onChange={(e) => setResumeURI(e.target.files[0])}
                      />
                      <Button
                        variant="outlined"
                        htmlFor="resume"
                        component="label"
                      >
                        Upload
                      </Button>
                    </Grid>
                    {validation ? (
                      <div style={{ color: "red", marginTop: "10px" }}>
                        Please select your resume
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={{ marginTop: "25px" }}
                      disabled={submitted ? true : false}
                    >
                      {submitted ? "Submitting.." : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </React.Fragment>
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={5}
            style={{
              backgroundColor: "#FAF9F8",
              height: "750px",
            }}
          >
            <Grid item xs={2} />
            <Grid item xs={8}>
              <JobDescriptionCard jobDetails={jobDetails} />
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {})(ApplyJob);
