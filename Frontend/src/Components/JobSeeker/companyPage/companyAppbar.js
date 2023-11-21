import React from "react";
import { Tabs, Tab, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const CompanyAppbar = (props) => {
  const ALL_TABS = [
    {
      label: "Snapshot",
      to: "/company?id=" + props.companyId + "&tab=snapshot",
      value: "snapshot",
    },
    {
      label: "Why Join Us",
      to: "/company?id=" + props.companyId + "&tab=whyjoinus",
      value: "whyjoinus",
    },
    {
      label: "Reviews",
      to: "/company?id=" + props.companyId + "&tab=reviews",
      value: "reviews",
    },
    {
      label: "Salaries",
      to: "/company?id=" + props.companyId + "&tab=salaries",
      value: "salaries",
    },
    {
      label: "Photos",
      to: "/company?id=" + props.companyId + "&tab=photos",
      value: "photos",
    },
    {
      label: "Jobs",
      to: "/company?id=" + props.companyId + "&tab=jobs",
      value: "jobs",
    },
  ];

  return (
    <div>
      <Tabs
        value={props.currentTab}
        scrollButtons="false"
        indicatorColor="primary"
      >
        <Grid container direction="row" md={12} justifyContent="space-evenly">
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
                    minWidth: "15px",
                    color: "black",
                    fontSize: "14px",
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

export default CompanyAppbar;
