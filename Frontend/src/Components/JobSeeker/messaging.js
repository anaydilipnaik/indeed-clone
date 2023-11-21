import React, { useEffect, useState } from "react";
import MainHeader from "./mainHeader";
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
} from "@mui/material";
import messagePicture from "../../Images/message_image.png";
import { makeStyles } from "@material-ui/core/styles";

const Messaging = (props) => {
  const userId = useSelector((state) => state.login.user.id);
  const [messageCards, setMessageCards] = useState(undefined);
  const [messageDetails, setMessageDetails] = useState([]);
  const [cardColor, setCardColor] = useState({ 0: "blue" });
  const [jobSeekerReply, setJobSeekerReply] = useState("");

  const useStyles = makeStyles({
    textarea: {
      resize: "both",
    },
  });
  const classes = useStyles();

  const onChangeReplyHandler = (event) => {
    setJobSeekerReply(event.target.value);
  };

  const onClickReply = async () => {
    const response = await fetch(`http://${NODE_HOST}:${NODE_PORT}/postReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicantId: messageDetails[0].applicantId,
        companyId: messageDetails[0].companyId,
        messageContent: jobSeekerReply,
        messageSender: "JobSeeker",
        applicantName: messageDetails[0].applicantName,
        companyName: messageDetails[0].companyName,
      }),
    });

    const data = await response.json();

    if (data.message === "Success") {
      retriveMessages(userId, messageDetails[0].companyId);
      setJobSeekerReply("");
    }
  };

  const getMessages = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getMessages?id=${userId}`,
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
    let companyIdsList = Object.keys(data);
    if (companyIdsList.length > 0) {
      setMessageCards(
        companyIdsList.map((companyIdData) => {
          return {
            companyId: companyIdData,
            companyName: data[companyIdData],
          };
        })
      );

      retriveMessages(userId, companyIdsList[0]);
    }
  };

  const retriveMessages = async (applicantId, companyId) => {
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
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <MainHeader currentTab="message"></MainHeader>
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
                  <Select
                    id="messageType"
                    variant="outlined"
                    defaultValue="Inbox"
                  >
                    <MenuItem value={"Inbox"}>Inbox</MenuItem>
                    <MenuItem value={"Archive"}>Archive</MenuItem>
                  </Select>
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
                        retriveMessages(userId, message.companyId);
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
                            {message.companyName}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
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
                    <Typography
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      Welcome to Messages
                    </Typography>

                    <Typography
                      style={{
                        fontSize: 14,
                      }}
                    >
                      When an employer contacts you, you will see messages here.
                    </Typography>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <Button
                        sx={{ mt: 5 }}
                        variant="contained"
                        style={{
                          textTransform: "none",
                        }}
                      >
                        Find Jobs
                      </Button>
                    </Link>
                    <br />
                    <Link
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
                    </Link>
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
                          marginTop: 10,
                          marginBottom: 5,
                        }}
                      >
                        Welcome to Messages
                      </Typography>
                      <Link to="/" style={{ textDecoration: "none" }}>
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
                      </Link>
                      <br />
                      <Link
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
                      </Link>
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
                              value={jobSeekerReply}
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
