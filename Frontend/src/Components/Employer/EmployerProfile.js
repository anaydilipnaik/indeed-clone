import React, { useState, useEffect } from "react";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import EmpHeader from "./EmployersHeader";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  Grid,
  Avatar,
  Stack,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { TextField, Typography, Box } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";

const EmployerProfile = (props) => {
  const email = useSelector((state) => state.login.user.email);
  console.log("The email id is " + email);
  //let id = "primary@accenture.com";
  const [employerDetails, setemployerDetails] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openUploadError, setOpenUploadError] = React.useState(false);
  const [openBannerAdded, setOpenBannerAdded] = React.useState(false);
  const [openLogoAdded, setOpenLogoAdded] = React.useState(false);

  const [openAdded, setOpenAdded] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onModalsubmit = () => {
    console.log("Modal Submitted!");
  };

  const handleCloseAdded = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUploadError(false);
    setOpenLogoAdded(false);
    setOpenBannerAdded(false);
    setOpenAdded(false);
    setOpenError(false);
  };
  const getEmployerDetails = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getprofile/company/:companyid?emp_id=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: session.token,
        },
      }
    );

    const data = await response.json();
    console.log("Employer details", data[0]);
    setemployerDetails({
      name: data[0].employerName ? data[0].employerName : " ",
      role: data[0].role ? data[0].role : " ",
      email: data[0].email,
      address: data[0].address ? data[0].address : " ",
      website: data[0].website ? data[0].website : " ",
      companyType: data[0].companyType ? data[0].companyType : " ",
      size: data[0].companySize ? data[0].companySize : " ",
      revenue: data[0].revenue ? data[0].revenue : " ",
      headquarters: data[0].headquarters ? data[0].headquarters : " ",
      industry: data[0].industry ? data[0].industry : " ",
      founded: data[0].founded ? data[0].founded : " ",
      mission: data[0].missionAndVision ? data[0].missionAndVision : " ",
      ceoName: data[0].ceoName ? data[0].ceoName : " ",
      desc: data[0].desc ? data[0].desc : " ",
      whyJoinUs: data[0].whyJoinUs ? data[0].whyJoinUs : " ",
    });
  };

  const updateEmployerDetails = async () => {
    if (isNaN(employerDetails.size)) {
      alert("Company Size should be a Number!");
      return;
    }
    if (isNaN(employerDetails.revenue)) {
      alert("Company Revenue should be a Number!");
      return;
    }

    if (isNaN(employerDetails.founded)) {
      alert("Founded should be a Number!");
      return;
    }

    axios
      .put(`http://${NODE_HOST}:${NODE_PORT}/updateprofile/company`, {
        emp_id: employerDetails.email,
        name: employerDetails.name,
        role: employerDetails.role,
        address: employerDetails.address,
        website: employerDetails.website,
        companyType: employerDetails.companyType,
        size: employerDetails.size,
        revenue: employerDetails.revenue,
        headquarters: employerDetails.headquarters,
        industry: employerDetails.industry,
        founded: employerDetails.founded,
        mission: employerDetails.mission,
        ceoName: employerDetails.ceoName,
        desc: employerDetails.desc,
        whyJoinUs: employerDetails.whyJoinUs,
      })
      .then((response) => {
        console.log("Successful Updation :" + response.status);
        setOpenAdded(true);
      })
      .catch((err) => {
        setOpenError(true);
        console.log(err);
      });
    // const response = await fetch(
    //   `http://${NODE_HOST}:${NODE_PORT}/updateprofile/company/:companyid`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       emp_id: employerDetails.email,
    //       name: employerDetails.name,
    //       role: employerDetails.role,
    //       address: employerDetails.address,
    //       website: employerDetails.website,
    //       companyType: employerDetails.companyType,
    //       size: employerDetails.size,
    //       revenue: employerDetails.revenue,
    //       headquarters: employerDetails.headquarters,
    //       industry: employerDetails.industry,
    //       founded: employerDetails.founded,
    //       mission: employerDetails.mission,
    //       ceoName: employerDetails.ceoName,
    //     }),
    //     query: JSON.stringify({
    //       emp_id: employerDetails.email,
    //       name: employerDetails.name,
    //       role: employerDetails.role,
    //       address: employerDetails.address,
    //       website: employerDetails.website,
    //       companyType: employerDetails.companyType,
    //       size: employerDetails.size,
    //       revenue: employerDetails.revenue,
    //       headquarters: employerDetails.headquarters,
    //       industry: employerDetails.industry,
    //       founded: employerDetails.founded,
    //       mission: employerDetails.mission,
    //       ceoName: employerDetails.ceoName,
    //     }),
    //   }
    // )
    //   .then((response) => {
    //     if (response.ok) {
    //       setOpenAdded(true);
    //     }
    //   })
    //   .catch((error) => {
    //     setOpenError(true);
    //     console.log(error);
    //   });
  };

  const updateprofileDescription = async () => {
    axios
      .put(
        `http://${NODE_HOST}:${NODE_PORT}/updateprofileDescription/company`,
        {
          emp_id: employerDetails.email,
          desc: employerDetails.desc,
          whyJoinUs: employerDetails.whyJoinUs,
        }
      )
      .then((response) => {
        console.log("Successful Updation :" + response.status);
        setOpenAdded(true);
      })
      .catch((err) => {
        setOpenError(true);
        console.log(err);
      });
  };

  const onLogoAdded = (event) => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      console.log("Update Logo");
      updateLogo(event);
    }
  };
  const updateLogo = async (event) => {
    console.log("Logo Called");
    const formData = new FormData();
    formData.append("logo", event.target.files[0]);
    formData.append("id", email);

    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/updateLogo`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Authorization: session.token,
          id: email,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setOpenLogoAdded(true);
        console.log("Logo ADDED !!!");
      }
    });
  };

  const onBannerAdded = (event) => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      updateBanner(event);
    }
  };
  const updateBanner = async (event) => {
    console.log("Banner Called");
    const formData = new FormData();
    formData.append("banner", event.target.files[0]);
    formData.append("id", email);

    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/updateBanner`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Authorization: session.token,
          id: email,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setOpenBannerAdded(true);
        console.log("Banner ADDED !!!");
      }
    });

    //const data = await response.json();
    //getJobSeekerDetails();
  };
  const onChangeHandler = (event) => {
    console.log("Here");
    const { name, value } = event.target;
    setemployerDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(employerDetails);
    updateEmployerDetails();
  };

  const onWhyJoinUs = (event) => {
    event.preventDefault();
    console.log(employerDetails);
    updateprofileDescription();
  };

  useEffect(() => {
    getEmployerDetails();
  }, []);
  return (
    <div>
      <EmpHeader currentTab="profile"></EmpHeader>
      <Grid container sx={{ mt: 3, mb: 3 }}>
        <Grid item md={3}></Grid>
        <Grid style={{ margin: 10 }}>
          <Stack justifyContent="center" spacing={1} direction="row">
            <Card
              variant="outlined"
              style={{
                width: "42vw",
                // margin: 15,
                height: "12vw",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                  Get started
                </Typography>
                <Stack justifyContent="center">
                  <input
                    type="file"
                    id="sampleFile"
                    style={{ display: "none" }}
                    onChange={onBannerAdded}
                  />
                  <Button
                    variant="outlined"
                    htmlFor="sampleFile"
                    component="label"
                    type={"submit"}
                    style={{ width: "50%", marginTop: 10 }}
                  >
                    Upload the Banner
                  </Button>
                </Stack>
                <Stack justifyContent="center">
                  <input
                    type="file"
                    id="sampleFile2"
                    style={{ display: "none" }}
                    onChange={onLogoAdded}
                  />
                  <Button
                    variant="outlined"
                    htmlFor="sampleFile2"
                    component="label"
                    type={"submit"}
                    style={{ width: "50%", marginTop: 10 }}
                  >
                    Upload Icon
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Stack justifyContent="center" spacing={2} direction="row">
            <Card
              variant="outlined"
              style={{
                display: "block",
                width: "42vw",
                margin: 15,
                textAlign: "left",
              }}
            >
              <CardContent>
                <Stack direction="row">
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Company Information
                  </Typography>
                </Stack>

                <p> </p>
                <form onSubmit={onSubmitHandler}>
                  <Box
                    sx={{
                      "& > :not(style)": { m: 4, width: "25ch" },
                    }}
                  >
                    <TextField
                      style={{ margin: 10 }}
                      name="name"
                      variant="outlined"
                      margin="dense"
                      label="Name of Employer"
                      value={employerDetails.name ? employerDetails.name : ""}
                      // value="hello"
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="role"
                      variant="outlined"
                      margin="dense"
                      label="Role in the Company"
                      value={employerDetails.role ? employerDetails.role : ""}
                      // value="hello"
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="address"
                      variant="outlined"
                      margin="dense"
                      label="Company Address"
                      value={
                        employerDetails.address ? employerDetails.address : ""
                      }
                      // value="hello"
                      onChange={onChangeHandler}
                    ></TextField>
                  </Box>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <TextField
                      style={{ margin: 10 }}
                      name="website"
                      variant="outlined"
                      margin="dense"
                      type="url"
                      label="Website Url"
                      value={
                        employerDetails.website ? employerDetails.website : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="companyType"
                      variant="outlined"
                      margin="dense"
                      label="Company Type"
                      value={
                        employerDetails.companyType
                          ? employerDetails.companyType
                          : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="size"
                      type="number"
                      variant="outlined"
                      margin="dense"
                      label="Size of Company"
                      value={employerDetails.size ? employerDetails.size : ""}
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="revenue"
                      type="number"
                      variant="outlined"
                      margin="dense"
                      label="Revenue"
                      value={
                        employerDetails.revenue ? employerDetails.revenue : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="headquarters"
                      variant="outlined"
                      margin="dense"
                      label="Head Quarters"
                      value={
                        employerDetails.headquarters
                          ? employerDetails.headquarters
                          : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                  </Box>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <TextField
                      style={{ margin: 10 }}
                      name="industry"
                      variant="outlined"
                      margin="dense"
                      label="Industry"
                      value={
                        employerDetails.industry ? employerDetails.industry : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="founded"
                      type="number"
                      variant="outlined"
                      margin="dense"
                      label="Founded"
                      value={
                        employerDetails.founded ? employerDetails.founded : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="mission"
                      variant="outlined"
                      margin="dense"
                      label="Mission & Vision"
                      value={
                        employerDetails.mission ? employerDetails.mission : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                    <TextField
                      style={{ margin: 10 }}
                      name="ceoName"
                      variant="outlined"
                      margin="dense"
                      label="Name of the CEO"
                      value={
                        employerDetails.ceoName ? employerDetails.ceoName : ""
                      }
                      onChange={onChangeHandler}
                    ></TextField>
                  </Box>

                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Stack>

          <Stack justifyContent="center" spacing={2} direction="row">
            {
              <Card
                variant="outlined"
                style={{
                  display: "block",
                  width: "42vw",
                  margin: 15,
                  height: "9vw",
                  textAlign: "left",
                }}
              >
                {" "}
                <CardContent>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Why Join Us?
                  </Typography>
                  <p></p>
                  <Typography
                    variant="caption"
                    style={{ fontSize: 14, fontWeight: 400 }}
                  >
                    <form onSubmit={onWhyJoinUs}>
                      <TextField
                        style={{ margin: 10 }}
                        name="whyJoinUs"
                        variant="outlined"
                        margin="dense"
                        label="Why Join Us"
                        value={
                          employerDetails.whyJoinUs
                            ? employerDetails.whyJoinUs
                            : ""
                        }
                        onChange={onChangeHandler}
                      ></TextField>

                      <TextField
                        style={{ margin: 10 }}
                        name="desc"
                        variant="outlined"
                        margin="dense"
                        label="Description"
                        value={employerDetails.desc ? employerDetails.desc : ""}
                        onChange={onChangeHandler}
                      ></TextField>
                    </form>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            }

            <Snackbar
              open={openAdded}
              autoHideDuration={2000}
              onClose={handleCloseAdded}
            >
              <Alert
                onClose={handleCloseAdded}
                severity="success"
                sx={{ width: "100%" }}
              >
                Profile Updated Successfully !
              </Alert>
            </Snackbar>
            <Snackbar
              open={openBannerAdded}
              autoHideDuration={2000}
              onClose={handleCloseAdded}
            >
              <Alert
                onClose={handleCloseAdded}
                severity="success"
                sx={{ width: "100%" }}
              >
                Banner Uploaded Successfully !
              </Alert>
            </Snackbar>
            <Snackbar
              open={openLogoAdded}
              autoHideDuration={2000}
              onClose={handleCloseAdded}
            >
              <Alert
                onClose={handleCloseAdded}
                severity="success"
                sx={{ width: "100%" }}
              >
                Logo Uploaded Successfully !
              </Alert>
            </Snackbar>
            <Snackbar
              open={openUploadError}
              autoHideDuration={2000}
              onClose={handleCloseAdded}
            >
              <Alert
                onClose={handleCloseAdded}
                severity="error"
                sx={{ width: "100%" }}
              >
                Upload Failed!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={2000}
              onClose={handleCloseAdded}
            >
              <Alert
                onClose={handleCloseAdded}
                severity="error"
                sx={{ width: "100%" }}
              >
                Error Occured While Updating !
              </Alert>
            </Snackbar>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployerProfile;
