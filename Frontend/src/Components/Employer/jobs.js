import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import EmployerDashboard from "./employerDashboard";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Jobs = (props) => {
  const [showJobApplicants, setShowJobApplicants] = useState([]);
  const [companyJobPostsData, setCompanyJobPostsData] = useState([]);
  const [redirectVar, setRedirectVar] = useState(" ");
  const [page, setPage] = useState(0);
  const resultsPerPage = 2;
  const userId = useSelector((state) => state.login.user.id);
  console.log("userid", userId);
  if (!userId) {
    setRedirectVar(<Redirect to={{
      pathname: '/login'
    }}/>)
  }


  const handleChange = async (event, value) => {
    setPage(value);
    getCompanyJobPosts(value);
    console.log("taaaaaaaaaaaaaaaaaa,", value);
  };
  const getCompanyJobPosts = async (pageValue) => {
    let skip = 0;
    if (pageValue > 0) skip = (pageValue - 1) * resultsPerPage;
    console.log(">>>>>>>", skip, ">.........", resultsPerPage);
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
    )
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data.result);
      //   setCompanyJobPostsData(data.result);
      // })
      // .catch((error) => {
      //   // Your error is here!
      //   console.log(error)
      // });
    
    const data = await response.json();
    setCompanyJobPostsData(data);
  }
  const redirectHandler = (e) => {
    e.preventDefault();
    setShowJobApplicants(
      <Redirect
        to={{
          pathname: '/employerApplicants',
          state: { jobId: e.target.value }
      }}
      />
    )
  }   
  useEffect(() => {
    getCompanyJobPosts(1);
  }, []);

  return (
    <div>
      <EmployerDashboard currentTab="jobs"></EmployerDashboard>
      {redirectVar}
      <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
      > 
      {companyJobPostsData.length !== 0 ? companyJobPostsData.map((job, index) => {
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
                <Button
                onClick={redirectHandler}
                value={job.id}
                >
                {job.jobTitle}
              </Button>
                {showJobApplicants}
              <div
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                  }}>
                    {job.city}, {job.state} {job.zip}
                  </div>
            </CardContent>
          </Card>
        </Grid>
        )
        
      }) 
      : (<Typography style={{ justifyContent: "center", fontSize: 30 }}>
      {" "}
      No jobs posted yet
    </Typography>)}
    
    
            {companyJobPostsData && companyJobPostsData?.length > 0 ? (
              <Pagination
                onChange={handleChange}
                count={20}
                variant="outlined"
                shape="rounded"
                style={{ display: "flex", justifyContent: "center" }}
              />
            ) : null}
       </Grid>
    </div>
  );
};

export default Jobs;