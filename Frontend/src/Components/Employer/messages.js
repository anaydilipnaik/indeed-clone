import React, { useEffect, useState } from "react";
import EmployersHeader from "./EmployersHeader";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import { Grid, Divider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Stack,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  Select,
  CardMedia,
  Avatar,
  TextField,
  OutlinedInput,
} from "@mui/material";
import messagePicture from "../../Images/message_image.png";
import { makeStyles } from "@material-ui/core/styles";

const Messaging = (props) => {
  const userId = useSelector((state) => state.login.user.id);
  const companyName = useSelector((state) => state.login.user.companyName);
  const [messageCards, setMessageCards] = useState(undefined);
  const [messageDetails, setMessageDetails] = useState([]);
  const [cardColor, setCardColor] = useState({ 0: "grey" });
  const [employerReply, setEmployerReply] = useState("");
  const [jobsDropdown, setJobsDropdown] = useState([]);
  const [displayJobsDropdown, setDisplayJobsDropdown] = useState(false);
  const [jobSelection, setJobSelection] = useState("");
  const [jobApplicantsData, setJobApplicantsData] = useState([]);
  const [currentApplicant, setCurrentApplicant] = useState(null);

  const useStyles = makeStyles({
    textarea: {
      resize: "both",
    },
  });
  const classes = useStyles();

  const getJobApplicants = async (jobId) => {
    console.log("applicant api call");
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getJobApplicants?id=${jobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // ).then(response => response.json())
    //   .then(data => {
    //     console.log("applicants for the job",data);
    //     setJobApplicantsData(data);
    //   })
    //   .catch((error) => {
    //     // Your error is here!
    //     console.log(error)
    //   });;
    const data = await response.json();
    console.log("applicants for the job", data);
    setJobApplicantsData(data);
  };

  const onChangeReplyHandler = (event) => {
    setEmployerReply(event.target.value);
  };

  const onClickReply = async () => {
    const response = await fetch(`http://${NODE_HOST}:${NODE_PORT}/postReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicantId: currentApplicant,
        companyId: userId,
        messageContent: employerReply,
        messageSender: "Employer",
        // applicantName: currentApplicant.firstName + currentApplicant.lastName,
        companyName: companyName,
      }),
    });

    const data = await response.json();

    if (data.message === "Success") {
      retriveMessages(userId, currentApplicant);
      setEmployerReply("");
    }
  };

  const jobSelectionChangeHandler = (e) => {
    e.preventDefault();
    setJobSelection(e.target.value.jobTitle);
    console.log("jobSelection", jobSelection);
    var jobId = e.target.value.id;
    getJobApplicants(jobId);
    // if (currentApplicant) {
    //   retriveMessages(userId, currentApplicant);
    // }
  };

  const getMessages = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getEmployerMessages?id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === "error") {
      setMessageCards(undefined);
    }
    let applicantIdsList = Object.keys(data);
    if (applicantIdsList.length > 0) {
      console.log(applicantIdsList, "******");
      setMessageCards(
        applicantIdsList.map((applicantIdData) => {
          return {
            applicantId: applicantIdData,
            applicantName: data[applicantIdData],
          };
        })
      );

      retriveMessages(userId, applicantIdsList[0]);
    }
  };

  const retriveMessages = async (companyId, applicantId) => {
    setCurrentApplicant(applicantId);
    setMessageDetails([]);
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getAllMessages?applicantId=${applicantId}&companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMessageDetails(data);
  };

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
          id: userId,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("company job posts", data.result);
        setJobsDropdown(data);
        console.log("lennnnn", jobsDropdown.length);
      })
      .catch((error) => {
        // Your error is here!
        console.log(error);
      });
  };

  useEffect(() => {
    getMessages();
    getCompanyJobPosts(1);
  }, []);

  console.log(jobApplicantsData);
  return (
    <div>
      <EmployersHeader currentTab="message"></EmployersHeader>
      <Grid container>
        <Stack direction="row" sx={{ mt: 3, mb: 3 }}>
          <Grid item md={3}>
            <Card
              variant="outlined"
              style={{
                overflow: "auto",
                display: "block",
                width: "25vw",
                marginLeft: 15,
                height: "45vw",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div"></Typography>
                <FormControl sx={{ m: 1 }} fullWidth>
                  {/* <Select
                    id="messageType"
                    variant="outlined"
                    defaultValue="Inbox"
                  >
                    <MenuItem value={"Inbox"}>Inbox</MenuItem>
                    <MenuItem value={"Archive"}>Archive</MenuItem>
                  </Select> */}

                  {jobsDropdown.length !== 0 ? (
                    <Select
                      displayEmpty
                      value={jobSelection.jobTitle}
                      onChange={jobSelectionChangeHandler}
                      input={<OutlinedInput />}
                      renderValue={(jobSelection) => {
                        if (jobSelection) {
                          return jobSelection.jobTitle;
                        }
                        return <em>Select Job</em>;
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="Placeholder">
                        <em>Select Job</em>
                      </MenuItem>
                      {jobsDropdown.map((job, index) => {
                        return (
                          <MenuItem key={index} value={job}>
                            {job.jobTitle}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  ) : (
                    <h1></h1>
                  )}
                </FormControl>
                <Divider></Divider>

                {/* using map display all messages for same applicant id */}

                {messageCards?.map((message, index) => {
                  return (
                    <Card
                      sx={{ mt: 3 }}
                      variant="outlined"
                      style={{
                        display: "block",
                        borderColor: cardColor[index],
                        width: "22vw",
                        height: "6vw",
                        textAlign: "left",
                      }}
                      onClick={() => {
                        setCardColor({ [index]: "blue" });
                        // retriveMessages(userId, message.companyId);
                        retriveMessages(userId, message.applicantId);
                      }}
                    >
                      <CardContent>
                        <Stack direction="row">
                          <Avatar />
                          <Typography
                            style={{
                              fontSize: 14,
                              marginLeft: 10,
                              marginTop: 10,
                              fontWeight: 600,
                            }}
                          >
                            {message.applicantName}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}

                {jobApplicantsData.length > 0 ? (
                  jobApplicantsData.map((applicant, index) => {
                    return (
                      //   <Typography
                      //   style={{
                      //     fontSize: 14,
                      //     marginLeft: 10,
                      //     marginTop: 10,
                      //     fontWeight: 600,
                      //   }}
                      // >
                      //   {applicant.firstName}
                      //   </Typography>
                      <Card
                        sx={{ mt: 3 }}
                        variant="outlined"
                        style={{
                          display: "block",
                          borderColor: cardColor[index],
                          width: "22vw",
                          height: "6vw",
                          textAlign: "left",
                        }}
                        onClick={() => {
                          setCardColor({ [index]: "blue" });
                          // retriveMessages(userId, message.companyId);
                          retriveMessages(userId, applicant.applicantId);
                        }}
                      >
                        <CardContent>
                          <Stack direction="row">
                            <Avatar />
                            <Typography
                              style={{
                                fontSize: 14,
                                marginLeft: 10,
                                marginTop: 10,
                                fontWeight: 600,
                              }}
                            >
                              {applicant.firstName} {applicant.lastName}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <p>No other active applicants for this job in chat</p>
                )}
              </CardContent>
            </Card>
          </Grid>

          {messageCards?.length === 0 ? (
            <Grid item md={8}>
              <Card
                variant="outlined"
                style={{
                  width: "65vw",
                  marginLeft: 70,
                  height: "45vw",
                }}
              >
                <Grid item>
                  <CardContent>
                    <Stack>
                      <CardMedia
                        style={{
                          marginTop: 60,
                          alignSelf: "center",
                          width: "150px",
                          height: "150px",
                        }}
                        component="img"
                        src={messagePicture}
                      />
                    </Stack>
                    {/* <Typography
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      Welcome to Messages
                    </Typography> */}

                    <Typography
                      style={{
                        fontSize: 14,
                      }}
                    >
                      Send a message
                    </Typography>
                    {/* <Link to="/" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{ mt: 5 }}
                        variant="contained"
                        style={{
                          textTransform: "none",
                        }}
                      >
                        Find Jobs
                      </Button>
                    </Link> */}
                    <br />
                    {/* <Link
                      to="/jobSeekerProfile"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        sx={{ mt: 1 }}
                        variant="outlined"
                        style={{
                          textTransform: "none",
                        }}
                      >
                        Upload Resume
                      </Button>
                    </Link> */}
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          ) : (
            <Grid item md={8}>
              <Card
                variant="outlined"
                style={{
                  overflow: "auto",
                  width: "65vw",
                  marginLeft: 70,
                  height: "45vw",
                }}
              >
                <Grid item>
                  <CardContent>
                    <Stack direction="row">
                      <CardMedia
                        style={{
                          width: "130px",
                          height: "130px",
                        }}
                        component="img"
                        src={messagePicture}
                      />
                      <Typography
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          marginTop: 20,
                          marginBottom: 5,
                          marginLeft: 30,
                        }}
                      >
                        Welcome to Messages
                      </Typography>
                      {/* <Link to="/" style={{ textDecoration: "none" }}>
                        <Button
                          sx={{ mt: 1 }}
                          variant="contained"
                          style={{
                            textTransform: "none",
                            marginLeft: 20,
                          }}
                        >
                          Find Jobs
                        </Button>
                      </Link> */}
                      <br />
                      {/* <Link
                        to="/jobSeekerProfile"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          sx={{ mt: 1 }}
                          variant="outlined"
                          style={{
                            marginLeft: 20,
                            textTransform: "none",
                          }}
                        >
                          Upload Resume
                        </Button>
                      </Link> */}
                    </Stack>
                    <Card
                      variant="outlined"
                      style={{
                        overflow: "auto",
                        width: "50vw",
                        marginLeft: 70,
                        height: "65vw",
                      }}
                    >
                      <Grid item>
                        <CardContent>
                          {messageDetails?.map((messageHistory, index) => {
                            return messageHistory.messageSender ===
                              "JobSeeker" ? (
                              <Stack direction="column" alignItems="flex-end">
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  size="big"
                                  multiline
                                  InputProps={{
                                    readOnly: true,
                                    className: classes.textarea,
                                  }}
                                  defaultValue={messageHistory.messageContent}
                                />
                              </Stack>
                            ) : (
                              <Stack direction="column">
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  multiline
                                  size="big"
                                  InputProps={{
                                    readOnly: true,
                                    className: classes.textarea,
                                  }}
                                  defaultValue={messageHistory.messageContent}
                                />
                              </Stack>
                            );
                          })}
                          <Stack sx={{ mt: 4 }} direction="column">
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              multiline
                              InputProps={{
                                className: classes.textarea,
                              }}
                              defaultValue={""}
                              value={employerReply}
                              onChange={onChangeReplyHandler}
                            />
                            <Button
                              sx={{ mt: 4 }}
                              size="small"
                              variant="contained"
                              onClick={() => onClickReply()}
                            >
                              Reply
                            </Button>
                          </Stack>

                          <br />
                        </CardContent>
                      </Grid>
                    </Card>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          )}
        </Stack>
      </Grid>
    </div>
  );
};

export default Messaging;
