import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Divider } from "@material-ui/core";
import noDataApplied from "../../../Images/noDataApplied.png";

const SuccessConfirmation = ({ review, salary }) => {
  return (
    <div
      style={{
        backgroundColor: "#f3f2f1",
        width: "100%",
        height: "850px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <form>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            marginTop: "75px",
            marginBottom: "100px",
            marginLeft: "450px",
          }}
        >
          <Paper
            variant="outlined"
            style={{
              borderRadius: "0.5rem",
              border: "1px solid #d4d2d0",
              padding: "24px",
              width: "480px",
              height: !review && !salary ? "550px" : "400px",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "50px",
              }}
            >
              <img
                src={noDataApplied}
                style={{
                  height: "150px",
                  width: "250px",
                  marginLeft: "25px",
                }}
              />
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                Your {review ? "review" : salary ? "salary" : "application"} has
                been submitted!
              </div>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                textAlign: "left",
                marginTop: "25px",
              }}
            >
              {!review && !salary ? (
                <>
                  <div>
                    <b>Keep track of all your applications</b>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    You will receive a status update in an email from Indeed
                    within a few weeks of submitting your application. In the
                    meantime, you can view and track all your applications in
                    the Indeed My jobs section at any time
                  </div>
                </>
              ) : null}
              {salary ? (
                <div
                  style={{
                    marginTop: "5px",
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Back to Home
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "5px",
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    window.location.href = review
                      ? "/myreviews"
                      : "/myjobs?tab=applied";
                  }}
                >
                  View your {review ? "reviews" : "applications"}
                </div>
              )}
            </Box>
          </Paper>
        </Container>
      </form>
    </div>
  );
};

export default SuccessConfirmation;
