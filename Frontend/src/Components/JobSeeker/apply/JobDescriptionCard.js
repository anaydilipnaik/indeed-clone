import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Divider } from "@material-ui/core";

const JobDescriptionCard = (props) => {
  return props.jobDetails ? (
    <Card
      sx={{ maxWidth: 500 }}
      style={{
        marginTop: "50px",
        maxWidth: "640px",
        padding: "8px 8px 0",
        backgroundColor: "#fff",
        border: "1px solid #d8d8d8",
        maxHeight: "631px",
        borderRadius: "8px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent style={{ textAlign: "left" }}>
        <Grid container direction="row">
          <Grid item xs={3}>
            <div
              style={{
                height: "100%",
                width: "3rem",
                minWidth: "3rem",
                border: "1px solid #ececec",
                borderRadius: "8px",
                marginRight: "1rem",
                padding: "0.5rem",
              }}
            >
              <img
                src={
                  props.jobDetails.companyLogo
                    ? props.jobDetails.companyLogo
                    : "https://forcebrands.com/assets/fallback/company-default-4549373b79625823b56e48c7918608f77be903ad2fd38cfc9b6929d095994013.png"
                }
                style={{ width: "3rem", height: "3rem" }}
              />
            </div>
          </Grid>
          <Grid item xs={9} style={{ marginTop: "15px" }}>
            <div style={{ fontSize: "14px" }}>
              <b>{props.jobDetails.jobTitle}</b>
            </div>
            <div style={{ fontSize: "12px" }}>
              {props.jobDetails.companyName} - {props.jobDetails.city}
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <p
        style={{
          textAlign: "left",
          marginTop: "5px",
          marginBottom: "15px",
        }}
      >
        {props.jobDetails.fulldescription ? (
          props.jobDetails.fulldescription
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            No Job Description found!
          </div>
        )}
      </p>
    </Card>
  ) : null;
};

export default JobDescriptionCard;
