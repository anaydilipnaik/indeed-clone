import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import EmployerDashboard from "./employerDashboard";
import {
  Grid,
  Stack,
  Card,
  CardContent,
  Typography,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import ApplicantStatusUpdate from './applicantStatusUpdate';
const Applicants = (props) => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [jobApplicantsData, setJobApplicantsData] = useState([]);
  const [jobsDropdown, setJobsDropdown] = useState([]);
  const [displayJobsDropdown, setDisplayJobsDropdown] = useState(false);
  const [jobSelection, setJobSelection] = useState("");

  const userId = useSelector((state) => state.login.user.id);
  console.log("userid", userId);

  
  let val = 1;
  const getCompanyJobPosts = async (val) => {
    let skip = 0;
    const resultsPerPage = 20000;
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getCompanyJobPosts?id=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skip: skip,
          take: resultsPerPage,
          id:userId
        }),
      }
    ).then(response => response.json())
      .then(data => {
        console.log("company job posts",data.result);
        setJobsDropdown(data)
        console.log("lennnnn", jobsDropdown.length);
      })
      .catch((error) => {
        // Your error is here!
        console.log(error)
      });;
  }
  let jobId;
  useEffect(() => {
    if (props.location.state) {
     
    jobId = props.location.state.jobId;
    getJobApplicants();
    console.log("jobId",jobId)
  } else {
    
    getCompanyJobPosts(1);
  }
  }, []);

  const updateApplicantStatus = async () => {
    console.log("updateApplicantStatus api call")
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/updateApplicantStatus?id=${jobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    // ).then(response => response.json())
    //   .then(data => {
    //     console.log("applicants for the job",data.result);
    //     setJobApplicantsData(data.result);
    //   });
    const data = await response.json();
    console.log("applicants for the job",data);
    setJobApplicantsData(data);
  }
  // const handleApplicantStatusChange = e => {
  //   e.preventDefault();
    
  //   setApplicantStatus(e.target.value);
  // }

  const getJobApplicants = async () => {
    console.log("applicant api call")
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getJobApplicants?id=${jobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(response => response.json())
      .then(data => {
        console.log("applicants for the job",data);
        setJobApplicantsData(data);
      })
      .catch((error) => {
        // Your error is here!
        console.log(error)
      });;
  }

  const jobSelectionChangeHandler = e => {
     e.preventDefault();
    setJobSelection(e.target.value.jobTitle);
    console.log("jobSelection", jobSelection);
    jobId = e.target.value.id;
    getJobApplicants();
  }

  
  
  return (
    <div>
      <EmployerDashboard currentTab="applicants"></EmployerDashboard>
      {jobsDropdown.length !== 0 ?
          <Select
          displayEmpty
          value={jobSelection.jobTitle}
          onChange={jobSelectionChangeHandler}
          input={<OutlinedInput />}
          renderValue={(jobSelection) => {
            if (jobSelection) {
              return jobSelection.jobTitle
            }
            return <em>Select Job</em>;
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="Placeholder" >
            <em>Select Job</em>
          </MenuItem>
          {
           jobsDropdown.map((job, index) => {
              return (
                <MenuItem key={index} value={job}>{job.jobTitle}</MenuItem>
              )
            })
          }
        </Select>
        : <h1></h1>}
      {/* OP OP */}
      <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
      > 
      {jobApplicantsData.length !== 0 ? jobApplicantsData.map((applicant, index) => {
        return (
          <Grid item >
          <Card
            variant="outlined"
            style={{
              display: "block",
              width: "90vw",
              margin: 15,
              textAlign: "left",
            }}
          >
            <CardContent>
            <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: 14, }}
                color="text.primary"
                gutterBottom
              >
                  <strong>{applicant.firstName} {applicant.lastName}</strong> <br></br>
                  <div
                  style={{
                    textAlign: "left",
                  }}>
                  Applied on {applicant.createdAt.slice(0,10)}
                  </div>
              </Typography>
              </Grid>
              <Grid item xs={4}>
                
                <a href={applicant.resumeURI}>Download Resume</a>
                
              </Grid>
              <Grid item xs={4}>
              {/* <Typography
                sx={{ fontSize: 14}}
                color="text.secondary"
                gutterBottom
                > 
                <Select labelId="label" id="select" placeholder={applicant.status} onChange={updateApplicantStatus(applicant)} value={applicant.status} sx={{ minWidth: 300, borderRadius: 2 }}>
                    <MenuItem value="s">Submitted</MenuItem>
                    <MenuItem value="r">Reviewed</MenuItem>
                    <MenuItem value="is">Initial screening</MenuItem>
                    <MenuItem value="i">Interviewing</MenuItem>
                    <MenuItem value="h">Hired</MenuItem>
                </Select>
                </Typography> */}
                    <ApplicantStatusUpdate
                    state={applicant}
                    ></ApplicantStatusUpdate>
              </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        )
        
      }) 
      : (<Typography style={{ justifyContent: "center", fontSize: 30 }}>
      {" "}
      No applicants yet
    </Typography>)}
       </Grid>
    </div>
  );
};

export default Applicants;

