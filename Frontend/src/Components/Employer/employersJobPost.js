import React, { useEffect, useState } from "react";
import EmployerDashboard from "./employerDashboard";
import { Grid, Divider, Typography } from "@material-ui/core";
import {
  Autocomplete,
  TextField,
  Button,
  Stack,
  Card,
  CardActions,
  CardContent,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';

const EmployersJobPost = (props) => {
  const [role, setRole] = useState("placeholder");
  const [jobTitle, setJobTitle] = useState('Job Title');
  const [country, setCountry] = useState("United States");
  const [showCountry, setShowCountry] = useState(true);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguage, setShowLanguage] = useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [value, setValue] = React.useState('');
  const [helperText, setHelperText] = React.useState('');
  const [streetAddress, setStreetAddress] = React.useState('');
  const [state, setState] = React.useState(" ");
  const [city, setCity] = React.useState(" ");
  const [zipCode, setZipCode] = React.useState(" ");
  const [jobLocation, setjobLocation] = React.useState(" Remote ");
  const [next, setNext] = React.useState(" ");

  const handleStreetAddressChange = e => {
    e.preventDefault();
    setStreetAddress(e.target.value);
  }

  const handleStateChange = e => {
    e.preventDefault();
    setState(e.target.value);
    setjobLocation( e.target.value);
  }

  const handleCityChange = e => {
    e.preventDefault();
    setCity(e.target.value);
  }

  const handleZipCodeChange = e => {
    e.preventDefault();
    setZipCode(e.target.value);
  }
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    if (value === 'in person') {
      setjobLocation("Location")
      setHelperText(
        <div>
          <Typography
            sx={{ fontSize: 14, }}
            color="text.secondary"
            gutterBottom
          >
            <strong>Street Address: </strong>
          </Typography>
          <OutlinedInput
            required
            sx={{ fontSize: 14, minWidth: 540, borderRadius: 2 }}
            onChange={handleStreetAddressChange}
          />
          <Grid container spacing={12}>
              <Grid item xs={4}>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
               <strong>State: </strong>
              </Typography>
              <OutlinedInput
                required
                sx={{ fontSize: 14, borderRadius: 2 }}
                onChange={handleStateChange}
              />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: 14, }}
                  color="text.secondary"
                  gutterBottom
                >
                <strong>City: </strong>
                </Typography>
                <OutlinedInput
                required
                sx={{ fontSize: 14, borderRadius: 2 }}
                onChange={handleCityChange}
                />
              </Grid>
              <Grid item xs={4}>
              <Typography
                  sx={{ fontSize: 14, }}
                  color="text.secondary"
                  gutterBottom
                >
                <strong>Zip Code: </strong>
              </Typography>
              <OutlinedInput
                required
                sx={{ fontSize: 14, borderRadius: 2 }}
                onChange={handleZipCodeChange}
              />
              </Grid>
            </Grid>
        </div>
      );
    } else if (value === 'remote') {
      setHelperText('');
    }
  }  

  const handleEditCountry = e => {
    e.preventDefault();
    setShowCountryDropdown(true);
    setShowCountry(false);
  }

  const handleEditLanguage = e => {
    e.preventDefault();
    setShowLanguageDropdown(true);
    setShowLanguage(false);
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    setRole(e.target.value);
  };

  const handleCountryChange = e => {
    e.preventDefault();
    setCountry(e.target.value);
  }

  const handleLanguageChange = e => {
    e.preventDefault();
    setLanguage(e.target.value);
  }

  const handleJobTitleChange = e => {
    e.preventDefault();
    setJobTitle(e.target.value);
  }

  
  const SaveInfoHandler = e => {
    e.preventDefault();
    var jobPosting = {
      "role": role,
      "jobTitle": jobTitle,
      "country":country,
      "language": language,
      "value": value,
      "streetAddress": streetAddress,
      "state": state,
      "city": city,
      "zipCode": zipCode,
      "isRemote": jobLocation === "Remote" ? 1 : 0,
      "inInPerson":jobLocation !== "Remote" ? 1 : 0,
    }
    sessionStorage.setItem('jobPosting', JSON.stringify(jobPosting));
    setNext ( <div>
      <Redirect to={{
         pathname: "employersJobDetails"
     }}>
     </Redirect>
    </div>)
  }
  const Country = (
    <React.Fragment>
      {country}
      <Button onClick={handleEditCountry}>
        <EditIcon color="primary"></EditIcon>
      </Button>
    </React.Fragment>
  )
  const CountryDropdown = (
    <Typography
      sx={{ fontSize: 14, }}
      color="text.secondary"
      gutterBottom
    >
      <Select labelId="label" id="select" placeholder={country} onChange={handleCountryChange} value={country} sx={{ minWidth: 540, borderRadius: 2 }}>
        {/* <MenuItem value="placeholder">Select an option</MenuItem> */}
        <MenuItem value="United States">United States</MenuItem>
        <MenuItem value="UK">UK</MenuItem>
        <MenuItem value="Qatar">Qatar</MenuItem>
        <MenuItem value="India">India</MenuItem>
        <MenuItem value="Germany">Germany</MenuItem>
      </Select>
    </Typography>
  )

  const Language = (
    <React.Fragment>
      {language}
      <Button onClick={handleEditLanguage}>
        <EditIcon color="primary"></EditIcon>
      </Button>
    </React.Fragment>
  )

  const LanguageDropdown = (
    <Typography
      sx={{ fontSize: 14, }}
      color="text.secondary"
      gutterBottom
    >
      <Select labelId="label" id="select" placeholder={language} onChange={handleLanguageChange} value={language} sx={{ minWidth: 540, borderRadius: 2 }}>
        {/* <MenuItem value="placeholder">Select an option</MenuItem> */}
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Hindi">Hindi</MenuItem>
        <MenuItem value="French">French</MenuItem>
        <MenuItem value="German">German</MenuItem>
        <MenuItem value="Chinese">Chinese</MenuItem>
      </Select>
    </Typography>
  )

  const JobDetailsPageLink = props => <Link to="/employersJobDetails" {...props} />
  const JobsPageLink = props => <Link to="/employerJobs" {...props} />

  return <div>
    {next}
    <EmployerDashboard></EmployerDashboard>
    <Grid container
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
        {/* <Grid item md={1}></Grid> */}
        <Grid item >
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
              <strong>Country: </strong> 
              {showCountry && Country}
              {showCountryDropdown && CountryDropdown} 
              </Typography>
              
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
              <strong>Language: </strong>
              {showLanguage && Language}
              {showLanguageDropdown && LanguageDropdown} 
              </Typography>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
               <strong>Company name: </strong> Cornelius
              </Typography>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
               <strong>Your role in the hiring process: </strong>
              </Typography>
              {/* <InputLabel id="label"><strong>Your role in the hiring process: </strong></InputLabel> */}
            <Select labelId="label" id="select" placeholder="Select an option" onChange={handleChange} value={role} sx={{ minWidth: 540, borderRadius: 2 }}>
                <MenuItem value="placeholder">Select an option</MenuItem>
                <MenuItem value="Human Resources Generalist">Human Resources Generalist</MenuItem>
                <MenuItem value="Owner/CEO">Owner/CEO</MenuItem>
                <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
                <MenuItem value="Recruiter or Talent Acquisition">Recruiter or Talent Acquisition</MenuItem>
                <MenuItem value="Assistant or Office Manager">Assistant or Office Manager</MenuItem>

              </Select>
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
              required
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
               <strong>Job Title: </strong>
              </Typography>
            <Select labelId="label" id="select" size="90vw" placeholder="Select an option" onChange={handleJobTitleChange} value={jobTitle} 
            sx={{ minWidth: 540, borderRadius: 2 }}
            >
                <MenuItem value="placeholder">Select an option</MenuItem>
                <MenuItem value="Software Developer">Software Developer</MenuItem>
                <MenuItem value="Sales Associate">Sales Associate</MenuItem>
                <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
                <MenuItem value="Cloud Architect">Cloud Architect</MenuItem>
                <MenuItem value="Marketing Manager">Marketing Manager</MenuItem>
              </Select>
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
            <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
               <strong>Which option best describes this role's location?</strong>
            </Typography>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onClick={handleRadioChange}
            >
              <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
                <FormControlLabel value="in person" control={<Radio />} label="in person" />
              </Box>
              <Box sx={{ border: 1, borderRadius: 2, minWidth: 500, padding: "5px", marginBottom:'10px'}}>
              <FormControlLabel value="remote" control={<Radio />} label="remote" defaultChecked/>
              </Box>
            </RadioGroup>
            {helperText}

            
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
              component={JobsPageLink}
              variant="outlined"
              size="large"
              style={{ margin: 10}}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
              component={JobDetailsPageLink}
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
              Save and continue
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
                
              {/* {streetAddress}{city}{state}{zipCode} */}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
  </div>
};

export default EmployersJobPost;