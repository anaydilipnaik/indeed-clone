import React, { useEffect, useState } from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import EmployerDashboard from "./employerDashboard";
import { NODE_HOST, NODE_PORT } from "../../envConfig";

import {
  Autocomplete,
  TextField,
  Button,
  Stack,
  Card,
  FormGroup,
  CardContent,
  Box,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployersJobCompensation = (props) => {
  const userId = useSelector((state) => state.login.user.id);
  const [jobTitle, setJobTitle] = useState('Job Title');
  const [jobType, setJobType] = React.useState('');
  const [jobLocation, setjobLocation] = React.useState(" Remote ");
  
  const [rate, setRate] = React.useState("per hour");
  const [amount, setAmount] = React.useState("");
  const [salaryCriteria, setSalaryCriteria] = React.useState("");
  const [supplementalPay, setSupplementalPay] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [next, setNext] = React.useState(" ");


  const handleRateChange = (event) => {
    setRate(event.target.value);
  }  

 const handleAmountChange = e => {
    e.preventDefault();
    setAmount(e.target.value);
  }
  
 const handleSalaryCriteriaChange = e => {
    e.preventDefault();
    setSalaryCriteria(e.target.value);
 }
    
 const handleSupplementalPayChange=e=>{
    e.preventDefault();
    setSupplementalPay( e.target.value);
     console.log("sup", supplementalPay);
 }

 const SaveInfoHandler = e => {
  e.preventDefault();

  const jobPosting = JSON.parse(sessionStorage.getItem("jobPosting"));

   jobPosting["salaryDetails"] = "$" + "" + amount + " " + rate;
   jobPosting["compensation"] = "At least $ " + amount + " " + rate +",* plus overtime and benefits";
  jobPosting["amount"] = amount;
  jobPosting["salaryCriteria"] = salaryCriteria;
  jobPosting["supplementalPay"] = supplementalPay;
  jobPosting["userId"] = userId;
   sessionStorage.setItem('jobPosting', JSON.stringify(jobPosting));
   
   postJob();
  setNext ( <div>
    <Redirect to={{
       pathname: "employerJobs"
   }}>
    </Redirect>
    </div>
    )
 }
  
  const postJob = async () => {
  // const jobPosting = JSON.parse(sessionStorage.getItem("jobPosting"));

  const response = await fetch(
    `http://${NODE_HOST}:${NODE_PORT}/postJob`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: sessionStorage.getItem("jobPosting"),
    }
  );

  const data = await response.json();

  // setJobSeekerDetails(data);
 };
  
 const JobsPageLink = props => <Link to="/employerJobs" {...props} />
 const JobDetailsPageLink = props => <Link to="/employersJobDetails" {...props} />

  return <div>
    {next}
    <EmployerDashboard></EmployerDashboard>
    <Grid container
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
        <Grid item >
          <Card
            variant="outlined"
            style={{
              display: "block",
              width: "50vw",
              margin: 15,
              marginLeft: 70,
              textAlign: "left",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              <strong>What is the pay? </strong> 
              </Typography>
              
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              Show pay by
              </Typography>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
                > 
                <Select labelId="label" id="select" placeholder={salaryCriteria} onChange={handleSalaryCriteriaChange} value={salaryCriteria} sx={{ minWidth: 540, borderRadius: 2 }}>
                    {/* <MenuItem value="Range">Range</MenuItem> */}
                    <MenuItem value="At Least">Starting Amount</MenuItem>
                    <MenuItem value="Qatar">Maximum Amount</MenuItem>
                    <MenuItem value="India">Exact Amount</MenuItem>
                </Select>
                </Typography>
                
                
            <Grid container spacing={12}>
              <Grid item xs={6}>
                <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
                >
                Amount
                </Typography>
                <TextField label="$" type="number" value={amount} onChange={handleAmountChange}></TextField>
                </Grid>
                
                <Grid item xs={6}>
                <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
                >
                Rate
                </Typography>
                <Select labelId="label" id="select" placeholder={rate} onChange={handleRateChange} value={rate} sx={{ borderRadius: 2 }}>
                    <MenuItem value="per hour" defaultChecked>per hour</MenuItem>
                    <MenuItem value="per day">per day</MenuItem>
                    <MenuItem value="per week">per week</MenuItem>
                    <MenuItem value="per month">per month</MenuItem>
                    <MenuItem value="per year">per year</MenuItem>
                </Select>
                </Grid>
                </Grid>
            </CardContent>
            
          </Card>
          <Card
            variant="outlined"
            style={{
              display: "block",
              width: "50vw",
              margin: 15,
              marginLeft: 70,
              // height: "17vw",
              textAlign: "left",
            }}
          >
            <CardContent>
            <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              <strong>Do you offer any of the following supplemental pay? </strong>
            </Typography>

            <FormGroup>
            <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Signing bonus" />
            </Box>
            <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel control={<Checkbox />} label="Commission pay" />
            </Box>
            <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel control={<Checkbox />} label="Bonus pay" />
            </Box>
            <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel control={<Checkbox />} label="Tips" />
            </Box>
            <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel control={<Checkbox />} label="Other Benefits" />
            </Box>
            </FormGroup>
            </CardContent>
          </Card>
          
          <Card
            variant="outlined"
            style={{
              display: "block",
              width: "50vw",
              margin: 15,
              marginLeft: 70,
              textAlign: "left",
            }}
          >
            <CardContent>
            <Grid container spacing={2}>
            <Grid item xs={12} md={8} >
              <Button
              component={JobDetailsPageLink}
              variant="outlined"
              size="large"
              style={{ margin: 10}}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
              component={JobsPageLink}
              style={{
              height: "44px",
              
              backgroundColor: "rgb(37, 87, 167)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              lineHeight: 0,
              letterSpacing: 0,
              textTransform: "none",
              margin: 10
            }}
              variant="contained"
              onClick={SaveInfoHandler}
            >
              Confirm
            </Button>
            </Grid></Grid>
            </CardContent>
          </Card>
      </Grid>

      
        <Grid item>
          <Card
            variant="outlined"
            style={{
              display: "block",
              width: "25vw",
              margin: 15,
              // height: "17vw",
              textAlign: "left",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              <strong>About this job </strong> <br></br>
              We use this information to find the best candidates for this job.
              </Typography>
              
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              <BusinessCenterIcon/>
              {jobTitle}
              </Typography>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
                <div>
                <LocationOnIcon />
                {jobLocation}
                </div>
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
  </div>
};

export default EmployersJobCompensation;