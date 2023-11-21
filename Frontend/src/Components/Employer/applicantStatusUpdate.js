import React, { useEffect, useState } from "react";
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

const ApplicantStatusUpdate = (props) => {
    const [applicantStatus, setApplicantStatus] = useState(props.state.status);
    console.log("props", props.state.id, props.state.status)

    const statusChangeHandler = e => {
        e.preventDefault();
        setApplicantStatus(e.target.value);
    }
    const updateApplicantStatus = async (e) => {
        // const response = await fetch(
        //   `http://${NODE_HOST}:${NODE_PORT}/getCompanyJobPosts?id=${userId}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // ).then(response => response.json())
        //   .then(data => {
        //     console.log("company job posts",data.result);
        //     setJobsDropdown(data.result)
        //     console.log("lennnnn", jobsDropdown.length);
        //   });
      }
    return (
        <div>
            <Typography
                sx={{ fontSize: 14}}
                color="text.secondary"
                gutterBottom
                > 
                <Select labelId="label" id="select" placeholder={applicantStatus} onChange={statusChangeHandler} value={applicantStatus} sx={{ minWidth: 300, borderRadius: 2 }}>
                    <MenuItem value="s">Submitted</MenuItem>
                    <MenuItem value="r">Reviewed</MenuItem>
                    <MenuItem value="is">Initial screening</MenuItem>
                    <MenuItem value="i">Interviewing</MenuItem>
                    <MenuItem value="h">Hired</MenuItem>
                </Select>
            </Typography>
        </div>
    );
}
export default ApplicantStatusUpdate;