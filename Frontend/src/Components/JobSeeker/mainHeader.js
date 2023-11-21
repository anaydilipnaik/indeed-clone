import React from "react";
import { Tabs, Tab, Divider, Grid } from "@material-ui/core";
import SignIn from "./signIn";
import Register from "./register";
import EmployersNavBar from "../Employer/employerDashboard";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmployersJobPost from "../Employer/employersJobPost";
import indeedLogo from "../../Images/IndeedIcon.png";
import { Link } from "react-router-dom";
import UploadResume from "./uploadResume";
import ProfileIconData from "./profileIconData";
import { useSelector } from "react-redux";

const MainHeader = (props) => {
  let RIGHT_PROFILE_TABS;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userId = useSelector((state) => state.login.user.id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LEFT_PROFILE_TABS = [
    {
      icon: <img alt={"logo"} width="115" height="40" src={indeedLogo} />,
      // to: "/",
      href: "/",
      value: "",
    },
    {
      label: "Find Jobs",
      href: "/",
      value: "findJobs",
    },

    {
      label: "Company Reviews",
      href: "/companyReviews",
      value: "companyReviews",
    },
    {
      label: "Find Salaries",
      href: "/findSalaries",
      value: "findSalaries",
    },
  ];

  if (userId) {
    RIGHT_PROFILE_TABS = [
      {
        value: "message",
        icon: <MessageIcon width={20} height={20} />,
        href: "/messaging",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "30px",
          marginLeft: 95,
        },
      },
      {
        value: "find",
        icon: <NotificationsIcon width={20} height={20} />,
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "30px",
          color: "black",
        },
      },
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

      {
        label: "Employers / Post Job",
        href: "/employerLandingPage",
        value: "employersPostJobs",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
    ];
  } else {
    RIGHT_PROFILE_TABS = [
      {
        label: "Upload your resume",
        href: "/login",
        component: <UploadResume />,
        value: "uploadResume",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
      {
        label: "Sign in",
        href: "/login",
        component: <SignIn />,
        value: "signIn",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "#121858",
          fontWeight: 600,
        },
      },
      {
        label: "Register",
        href: "/register",
        component: <Register />,
        value: "register",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "#121858",
          fontWeight: 600,
        },
      },
      {
        label: "Employers / Post Job",
        href: "/employersPostJobs",
        component: <EmployersJobPost />,
        value: "employersPostJobs",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
    ];
  }
  return (
    <div>
      <Grid container>
        <Grid item md={5}>
          <Tabs
            value={props.currentTab}
            scrollButtons="false"
            indicatorColor="primary"
          >
            {LEFT_PROFILE_TABS.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  href={tab.href}
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
              );
            })}
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
              <ProfileIconData
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

export default MainHeader;
