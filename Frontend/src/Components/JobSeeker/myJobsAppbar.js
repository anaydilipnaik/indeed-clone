import React from "react";
import { Tabs, Tab, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const MyJobsAppbar = (props) => {
  const ALL_TABS = [
    {
      label: "Saved",
      to: "/myjobs?tab=saved",
      value: "saved",
    },
    {
      label: "Applied",
      to: "/myjobs?tab=applied",
      value: "applied",
    },
  ];

  return (
    <div>
      <Tabs
        value={props.currentTab}
        scrollButtons="false"
        indicatorColor="primary"
      >
        <Grid container direction="row" md={12} justifyContent="left">
          {ALL_TABS.map((tab) => (
            <>
              <Grid item style={{ marginTop: "15px" }}>
                <Tab
                  key={tab.value}
                  value={tab.value}
                  component={Link}
                  to={tab.to}
                  label={tab.label}
                  color={tab.color}
                  style={{
                    textTransform: "none",
                    padding: 0,
                    margin: 10,
                    marginRight: "30px",
                    minWidth: "15px",
                    color: "black",
                    fontSize: "20px",
                  }}
                  icon={tab.icon}
                  indicatorColor="primary"
                  textColor="primary"
                />
              </Grid>
            </>
          ))}
        </Grid>
      </Tabs>
    </div>
  );
};

export default MyJobsAppbar;
