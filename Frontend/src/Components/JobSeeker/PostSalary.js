import React, { useState } from "react";
import MainHeader from "./mainHeader";
import { Grid } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SuccessConfirmation from "./apply/SuccessConfirmation";
import axios from "axios";
import { NODE_HOST, NODE_PORT } from "../../envConfig";

const PostSalary = (props) => {
  const [isCurrent, setIsCurrent] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [salary, setSalary] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(null);
  const [isPaidTimeOff, setIsPaidTimeOff] = useState(false);
  const [isHealthInsurance, setIsHealthInsurance] = useState(false);
  const [isLifeInsurance, setIsLifeInsurance] = useState(false);
  const [isDentalVisionInsurance, setIsDentalVisionInsurance] = useState(false);
  const [isRetirement401k, setIsRetirement401k] = useState(false);
  const [otherBenefits, setOtherBenefits] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    data.applicantId = props.user.id;
    data.companyName = companyName;
    data.applicantName = props.user.firstName + " " + props.user.lastName;
    data.isCurrent = isCurrent;
    if (endDate) data.endDate = endDate;
    data.jobTitle = jobTitle;
    data.location = location;
    data.salary = salary;
    data.yearsOfExperience = yearsOfExperience;
    data.isPaidTimeOff = isPaidTimeOff;
    data.isHealthInsurance = isHealthInsurance;
    data.isLifeInsurance = isLifeInsurance;
    data.isDentalVisionInsurance = isDentalVisionInsurance;
    data.isRetirement401k = isRetirement401k;
    data.otherBenefits = otherBenefits;
    data.status = "Pending";
    axios
      .post(`http://${NODE_HOST}:${NODE_PORT}/postSalary`, data)
      .then((res) => {
        if (res.data === "Success") setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  const search = useLocation().search;
  const companyName = new URLSearchParams(search).get("companyname");

  return (
    <div>
      <MainHeader currentTab="companyReviews" />
      {success ? (
        <SuccessConfirmation salary={true} />
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
                variant="h4"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "25px",
                }}
              >
                Submit a Salary
              </Typography>
              <form onSubmit={onSubmit}>
                <Grid container style={{ marginTop: "15px" }}>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Typography
                          style={{
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginBottom: "5px",
                          }}
                        >
                          Are you currently working at this company?
                        </Typography>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={isCurrent}
                          onChange={(e) => setIsCurrent(e.target.value)}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {isCurrent === false ? (
                      <TextField
                        name="endDate"
                        label="End Date"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        style={{ marginTop: "15px" }}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    ) : null}
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
                        label="What’s your job title?"
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
                        label="Where’s your job location?"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container direction="row" xs={12}>
                    <Grid
                      item
                      xs={6}
                      style={{ marginBottom: "15px", paddingRight: "10px" }}
                    >
                      <TextField
                        required
                        name="salary"
                        label="Salary"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: "15px" }}>
                      <TextField
                        name="yearsOfExperience"
                        label="How many years of relevant experience do you have?"
                        fullWidth
                        autoComplete="family-name"
                        variant="outlined"
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Typography
                      style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Which benefits do you receive here? (Tick the ones that
                      apply)
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setIsPaidTimeOff(!isPaidTimeOff)}
                          />
                        }
                        label="Paid time off"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) =>
                              setIsHealthInsurance(!isHealthInsurance)
                            }
                          />
                        }
                        label="Health insurance"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) =>
                              setIsLifeInsurance(!isLifeInsurance)
                            }
                          />
                        }
                        label="Life insurance"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) =>
                              setIsDentalVisionInsurance(
                                !isDentalVisionInsurance
                              )
                            }
                          />
                        }
                        label="Dental/ vision insurance"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) =>
                              setIsRetirement401k(!isRetirement401k)
                            }
                          />
                        }
                        label="Retirement/ 401(k)"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <TextField
                      name="otherBenefits"
                      label="Other Benefits"
                      fullWidth
                      autoComplete="family-name"
                      variant="outlined"
                      onChange={(e) => setOtherBenefits(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={{ marginTop: "25px" }}
                    >
                      Submit
                    </Button>
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

export default connect(mapStateToProps, {})(PostSalary);
