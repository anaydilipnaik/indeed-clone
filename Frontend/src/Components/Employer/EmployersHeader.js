import React from "react";
import { Tabs, Tab, Divider, Grid } from "@material-ui/core";
//import SignIn from "./signIn";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmployersJobPost from "../Employer/employersJobPost";
import indeedLogo from "../../Images/IndeedIcon.png";
import { Link } from "react-router-dom";
//import UploadResume from "./uploadResume";
import ProfileDropDown from "./ProfileDropDown";

const EmployersHeader = (props) => {
  let RIGHT_PROFILE_TABS;
  let user = "Signed In";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LEFT_PROFILE_TABS = [
    {
      icon: <img alt={"logo"} width="115" height="40" src={indeedLogo} />,
      to: "/employerLandingPage",
      value: "",
    },
    {
      label: "Dashboard",
      to: "/employerDashboard",
      value: "dashboard",
    },

    {
      label: "Message",
      to: "/employerMessages",
      value: "message",
    },
  ];

  RIGHT_PROFILE_TABS = [
    {
      value: "profile",
      icon: <PersonIcon width={20} height={20} onClick={handleClick} />,
      style: {
        textTransform: "none",
        padding: 0,
        margin: 10,
        minWidth: "30px",
        color: "black",
      },
    },
  ];
  return (
    <div>
      <Grid container>
        <Grid item md={5}>
          <Tabs
            value={props.currentTab}
            scrollButtons="false"
            indicatorColor="primary"
          >
            {LEFT_PROFILE_TABS.map((tab) => (
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
                  minWidth: "20px",
                }}
                icon={tab.icon}
                indicatorColor="primary"
                textColor="primary"
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item md={3}>
          <Tabs>
            <Tab
              style={{
                textTransform: "none",
                padding: 0,
                margin: 10,
                minWidth: "20px",
              }}
            ></Tab>
          </Tabs>
        </Grid>
        <Grid item md={4}>
          <Tabs value={props.currentTab} scrollButtons="false">
            <Grid item md={3}>
              <Tabs>
                <Tab
                  style={{
                    textTransform: "none",
                    padding: 0,
                    margin: 10,

                    minWidth: "100px",
                  }}
                ></Tab>
              </Tabs>
            </Grid>
            <Grid item md={3}>
              <Tabs>
                <Tab
                  style={{
                    textTransform: "none",
                    padding: 0,
                    margin: 10,
                    minWidth: "10px",
                  }}
                ></Tab>
              </Tabs>
            </Grid>
            <Grid item md={3}>
              <Tabs>
                <Tab
                  style={{
                    textTransform: "none",
                    padding: 0,
                    margin: 10,
                    minWidth: "10px",
                  }}
                ></Tab>
              </Tabs>
            </Grid>
            {RIGHT_PROFILE_TABS.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  href={tab.href}
                  label={tab.label}
                  style={tab.style}
                  icon={tab.icon}
                />
              );
            })}

            {open ? (
              <ProfileDropDown
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              />
            ) : null}
          </Tabs>
        </Grid>
      </Grid>
      <Divider></Divider>
    </div>
  );
};

export default EmployersHeader;
