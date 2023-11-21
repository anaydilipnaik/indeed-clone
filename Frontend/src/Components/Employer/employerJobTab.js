import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import EmployerDashboard from "./employerDashboard";
import { Grid, Divider, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";

import CompanyRating from "../JobSeeker/companyRating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Autocomplete,
  TextField,
  Button,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Pagination,
} from "@mui/material";

const EmployerJobTab = (props) => {
  const [jobCards, setJobCards] = useState(undefined);
  const [jobDetails, setJobDetails] = useState({});
  const [jobFilterWhat, setJobFilterWhat] = useState("");
  const [jobFilterWhere, setJobFilterWhere] = useState("");
  const [jobWhatTypeaheadList, setWhatTypeaheadList] = useState([]);
  const [jobWhereTypeaheadList, setWhereTypeaheadList] = useState([]);
  const [jobWhatTypeaheadValue, setJobWhatTypeaheadValue] = useState("");
  const [jobWhereTypeaheadValue, setJobWhereTypeaheadValue] = useState("");

  const [cardColor, setCardColor] = useState({ 0: "blue" });
  const [page, setPage] = useState(0);

  const userId = useSelector((state) => state.login.user.id);
  console.log("userid", userId);

  const resultsPerPage = 1;

  const handleChange = async (event, value) => {
    setPage(value);
    getJobsList(value);
  };

  const val = " days ago";
  var today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const renderBulletList = (text) => {
    let textList = text?.split("· ");

    return textList?.map((detail) => {
      if (detail.length > 0) {
        return <li>{detail}</li>;
      } else return null;
    });
  };

  const onClickHandler = () => {
    if (jobWhatTypeaheadValue.length > 0 || jobWhereTypeaheadValue.length > 0) {
      getJobsList(0);
      setPage(0);
    } else alert("Choose a What or Where filter option for Job Search !!");
  };

  //   const getCompanyJobPosts = async () => {
  //     const response = await fetch(
  //       `http://${NODE_HOST}:${NODE_PORT}/getCompanyJobPosts?id=${props.companyId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.result);
  //         setJobCards(data.result);
  //         // if (data.status === "error") {
  //         //     setJobCards(undefined);
  //         //   }

  //         if (data && data.result > 0) {
  //           setCardColor({ 0: "blue" });
  //           setJobDetails(data.result[0]);
  //         }
  //       });
  //   };

  const getJobsList = async (pageValue) => {
    let skip = 0;
    if (pageValue > 0) skip = (pageValue - 1) * resultsPerPage;
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getJobsList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          what: jobWhatTypeaheadValue,
          where: jobFilterWhere,
          skip: skip,
          take: resultsPerPage,
          companyId: props.companyId,
        }),
      }
    );

    const data = await response.json();

    setCardColor({ 0: "blue" });

    if (data.status === "error") {
      setJobCards(undefined);
    }
    setJobCards(data);
    if (data && data.length > 0) {
      setJobDetails(data[0]);
    }
  };

  const getWhatTypeAheadList = async () => {
    if (jobFilterWhat.length >= 3) {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getWhatTypeAheadList?what=${jobFilterWhat}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setWhatTypeaheadList(data);
    }
  };

  const getWhereTypeAheadList = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getWhereTypeAheadList?where=${jobFilterWhere}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setWhereTypeaheadList(data);
  };

  useEffect(() => {
    if (props.companyId) {
      getJobsList();
    }
  }, [props.companyId]);

  useEffect(() => {
    getWhatTypeAheadList();
  }, [jobFilterWhat]);

  useEffect(() => {
    getWhereTypeAheadList();
  }, [jobFilterWhere]);

  return (
    <div>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={3} style={{ margin: 10 }}>
          <Autocomplete
            sx={{ mt: 5 }}
            freeSolo
            size="small"
            id="free-solo-2-demo"
            disableClearable
            options={jobWhatTypeaheadList}
            value={jobWhatTypeaheadValue}
            onChange={(event, newValue) => {
              setJobWhatTypeaheadValue(newValue); //limit to 3 characters
            }}
            inputValue={jobFilterWhat}
            onInputChange={(event, newInputValue) => {
              setJobFilterWhat(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`What Job title, keywords`}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>

        <Grid item md={3} style={{ margin: 10 }}>
          <Autocomplete
            sx={{ mt: 5 }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            size="small"
            options={jobWhereTypeaheadList}
            value={jobWhereTypeaheadValue}
            onChange={(event, newValue) => {
              setJobWhereTypeaheadValue(newValue);
            }}
            inputValue={jobFilterWhere}
            onInputChange={(event, newInputValue) => {
              setJobFilterWhere(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Where"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item style={{ margin: 10 }}>
          <Button
            sx={{ mt: 5 }}
            variant="contained"
            style={{
              textTransform: "none",
            }}
            onClick={onClickHandler}
          >
            Find jobs
          </Button>
        </Grid>
      </Grid>
      <Grid flex></Grid>
      <Divider></Divider>

      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item>
          {jobCards?.map((jobs, index) => {
            let secondDate = new Date(jobs.createdAt);
            let numDays = Math.round(Math.abs((today - secondDate) / oneDay));
            return (
              <Card
                variant="outlined"
                style={{
                  borderColor: cardColor[index],
                  display: "block",
                  width: "30vw",
                  margin: 15,
                  height: "18vw",
                  textAlign: "left",
                }}
                onClick={() => {
                  setCardColor({ [index]: "blue" });
                  setJobDetails(jobs);
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {jobs.jobTitle}
                    </Typography>
                    <Stack direction="row">
                      <Typography style={{ marginRight: 10, fontSize: 14 }}>
                        <Link
                          to={"/company?id=" + jobs.companyId}
                          style={{ marginRight: 10 }}
                        >
                          {jobs.companyName}
                        </Link>
                      </Typography>
                      <Typography style={{ marginRight: 10, fontSize: 14 }}>
                        {jobs.averageRating ? jobs.averageRating : 0}
                        <StarIcon
                          style={{ fontSize: "small", color: "grey" }}
                        />
                      </Typography>
                    </Stack>
                    <Typography style={{ marginRight: 10, fontSize: 14 }}>
                      {jobs.address}

                      <br />
                    </Typography>

                    <Typography style={{ marginTop: 10, fontSize: 14 }}>
                      {"Salary " + jobs.salaryDetails}

                      <br />
                    </Typography>
                    <p></p>
                    <Typography style={{ fontSize: 13 }} sx={{ mb: 2 }}>
                      {(jobs.fulldescription?.substring(0, 200)
                        ? jobs.fulldescription?.substring(0, 200)
                        : "") + "..."}
                    </Typography>
                    <p></p>
                    <Typography style={{ fontSize: 13 }} sx={{ mb: 2 }}>
                      {numDays + val}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                {/* <CardActions></CardActions> */}
              </Card>
            );
          })}{" "}
          {jobCards && jobCards?.length > 0 ? (
            <Pagination
              onChange={handleChange}
              count={20}
              variant="outlined"
              shape="rounded"
              style={{ display: "flex", justifyContent: "center" }}
            />
          ) : null}
        </Grid>

        {/* display of main job card */}
        {jobCards && jobCards?.length > 0 ? (
          <Grid item>
            <Card
              variant="outlined"
              style={{
                overflow: "auto",
                display: "block",
                width: "45vw",
                margin: 15,
                height: "65vw",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {jobDetails.jobTitle}
                </Typography>

                <Stack direction="row">
                  <Link
                    to={"/company?id=" + jobDetails.companyId}
                    style={{ marginRight: 10 }}
                  >
                    {jobDetails.companyName}
                  </Link>
                  <CompanyRating
                    rating={jobDetails.averageRating}
                    color={"grey"}
                  />
                  <Link to="/company?tab=reviews" style={{ marginRight: 10 }}>
                    {jobDetails.totalReviews + " reviews"}
                  </Link>
                </Stack>
                <Typography
                  style={{ marginRight: 10, marginTop: 5, fontSize: 14 }}
                >
                  {jobDetails.address}

                  <br />
                </Typography>
                <Typography style={{ marginRight: 10, fontSize: 14 }}>
                  {jobDetails.type}
                </Typography>
                <Typography
                  style={{ marginRight: 10, marginBottom: 10, fontSize: 12 }}
                >
                  Employer actively reviewed job 3 days ago
                </Typography>

                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                >
                  <Link
                    to={userId ? "/apply?jobid=" + jobDetails.id : "/login"}
                    style={{ color: "white" }}
                  >
                    {" "}
                    Apply now
                  </Link>
                </Button>

                <Divider />

                <Stack>
                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    Job details
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Salary
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    {jobDetails.salaryDetails}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    Job Type
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    {jobDetails.type}
                  </Typography>
                </Stack>

                <Divider></Divider>

                <Stack>
                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    Full Job Description
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    {jobDetails.fulldescription}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    <b size="3">Location :</b>{" "}
                    {jobDetails.streetAddress +
                      ", " +
                      jobDetails.city +
                      ", " +
                      jobDetails.state +
                      ", " +
                      jobDetails.zip}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    <b size="3">Compenstaion :</b> {jobDetails.compensation}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    What You’ll Do{" "}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    {renderBulletList(jobDetails.whatYouWillDo)}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    What You’ll Need{" "}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    {renderBulletList(jobDetails.whatYouWillNeed)}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    {"Why You'll Love Working for a " + jobDetails.jobTitle}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    {renderBulletList(jobDetails.whatYouWillLoveWorkingFor)}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 13,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    {jobDetails.website}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ) : jobCards?.length === 0 ? (
          <Typography style={{ justifyContent: "center", fontSize: 30 }}>
            {" "}
            No jobs found !!
          </Typography>
        ) : null}
      </Grid>
    </div>
  );
};

export default EmployerJobTab;
