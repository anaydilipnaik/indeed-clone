import React, { useEffect, useState } from "react";
import MainHeader from "./mainHeader";
import { Grid, Divider, Button } from "@material-ui/core";
import MyJobsAppbar from "./myJobsAppbar";
import noData from "../../Images/noData.png";
import noDataApplied from "../../Images/noDataApplied.png";
import crossIcon from "../../Images/baseline_close_black_24dp.png";
import clockIcon from "../../Images/baseline_query_builder_black_24dp.png";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSavedJobsByJobseekerId,
  getAppliedJobsByJobseekerId,
  deleteSavedJob,
} from "../../controllers/jobs";

const MyJobs = ({ user }) => {
  const [savedList, setSavedList] = useState(false);
  const [savedListData, setSavedListData] = useState(null);
  const [appliedList, setAppliedList] = useState(false);
  const [appliedListData, setAppliedListData] = useState(null);

  const handleDelete = (e, jobId) => {
    e.preventDefault();
    deleteSavedJob(jobId, { active: 0 })
      .then((res) => {
        if (res.data === "Success") getData();
      })
      .catch((err) => console.log(err));
  };

  const ReturnJobList = () => {
    if (savedList) {
      if (savedListData && savedListData.length > 0)
        return (
          <>
            {savedListData.map((job) => (
              <>
                <Grid container direction="column">
                  <Grid
                    item
                    container
                    direction="row"
                    style={{ marginTop: "15px" }}
                  >
                    <Grid item xs={1}>
                      <img
                        src={
                          job.companyLogo
                            ? job.companyLogo
                            : "https://forcebrands.com/assets/fallback/company-default-4549373b79625823b56e48c7918608f77be903ad2fd38cfc9b6929d095994013.png"
                        }
                        style={{ width: "55px", height: "55px" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          textAlign: "left",
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.jobTitle}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.companyName}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.address.split(",")[0]}
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <Button
                        style={{
                          height: "44px",
                          width: "220.22px",
                          backgroundColor: "rgb(37, 87, 167)",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          lineHeight: 0,
                          letterSpacing: 0,
                          textTransform: "none",
                        }}
                        variant="contained"
                        onClick={() => {
                          window.location.href = "/apply?jobid=" + job.id;
                        }}
                      >
                        Apply now
                      </Button>
                      <Button
                        style={{
                          height: "44px",
                          width: "154.55px",
                          color: "rgb(37, 87, 167)",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          lineHeight: 0,
                          letterSpacing: 0,
                          textTransform: "none",
                          marginLeft: "15px",
                        }}
                        variant="outlined"
                      >
                        Update status
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{ marginTop: "10px", cursor: "pointer" }}
                    >
                      <img
                        src={crossIcon}
                        onClick={(e) => handleDelete(e, job.id)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "15px" }}>
                    <Divider />
                  </Grid>
                </Grid>
              </>
            ))}
          </>
        );
      else if (savedListData && savedListData.length === 0)
        return (
          <>
            <Grid item container direction="column" style={{}}>
              <Grid item style={{ textAlign: "center" }}>
                <img src={noData} style={{ width: "204px", height: "139px" }} />
              </Grid>
              <Grid
                item
                style={{
                  color: "#2d2d2d",
                  fontSize: "1rem",
                  fontWeight: "700",
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                No jobs saved yet
              </Grid>
              <Grid
                item
                style={{
                  marginTop: "15px",
                  color: "#595959",
                  fontSize: ".875rem",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                Jobs you choose to save during a job search will be shown here.
              </Grid>
              <Grid item>
                <Button
                  style={{
                    height: "44px",
                    width: "153.33px",
                    backgroundColor: "rgb(37, 87, 167)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    lineHeight: 0,
                    letterSpacing: 0,
                    textTransform: "none",
                    marginTop: "25px",
                  }}
                  variant="contained"
                >
                  Find jobs
                </Button>
              </Grid>
            </Grid>
          </>
        );
      else return null;
    } else if (appliedList) {
      if (appliedListData && appliedListData.length > 0)
        return (
          <>
            {appliedListData.map((job) => (
              <>
                <Grid container direction="column">
                  <Grid
                    item
                    container
                    direction="row"
                    style={{ marginTop: "15px" }}
                  >
                    <Grid item xs={1}>
                      <img
                        src={
                          job.companyLogo
                            ? job.companyLogo
                            : "https://forcebrands.com/assets/fallback/company-default-4549373b79625823b56e48c7918608f77be903ad2fd38cfc9b6929d095994013.png"
                        }
                        style={{ width: "55px", height: "55px" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          textAlign: "left",
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.jobTitle}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.companyName}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        {job.address.split(",")[0]}
                      </div>
                    </Grid>
                    <Grid item xs={5} style={{ marginTop: "10px" }}>
                      {/* <img src={clockIcon} /> */}
                      <span
                        style={{
                          height: "44px",
                          width: "228.22px",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          lineHeight: 0,
                          letterSpacing: 0,
                          textTransform: "none",
                        }}
                      >
                        Application submitted
                      </span>
                      <Button
                        style={{
                          height: "44px",
                          width: "154.55px",
                          color: "rgb(37, 87, 167)",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          lineHeight: 0,
                          letterSpacing: 0,
                          textTransform: "none",
                          marginLeft: "25px",
                        }}
                        variant="outlined"
                      >
                        Update status
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "15px" }}>
                    <Divider />
                  </Grid>
                </Grid>
              </>
            ))}
          </>
        );
      else if (appliedListData && appliedListData.length === 0)
        return (
          <>
            <Grid item container direction="column">
              <Grid item style={{ textAlign: "center" }}>
                <img
                  src={noDataApplied}
                  style={{ width: "204px", height: "139px" }}
                />
              </Grid>
              <Grid
                item
                style={{
                  color: "#2d2d2d",
                  fontSize: "1rem",
                  fontWeight: "700",
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                No applications yet
              </Grid>
              <Grid
                item
                style={{
                  marginTop: "15px",
                  color: "#595959",
                  fontSize: ".875rem",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                Once you apply to jobs, you can track the status of the
                applications here.
              </Grid>
              <Grid item>
                <Button
                  style={{
                    height: "44px",
                    width: "153.33px",
                    backgroundColor: "rgb(37, 87, 167)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    lineHeight: 0,
                    letterSpacing: 0,
                    textTransform: "none",
                    marginTop: "25px",
                  }}
                  variant="contained"
                >
                  Find jobs
                </Button>
              </Grid>
            </Grid>
          </>
        );
      else return null;
    } else return null;
  };

  const search = useLocation().search;

  useEffect(() => {
    const tab = new URLSearchParams(search).get("tab");
    if (tab) {
      if (tab === "saved") {
        setSavedList(true);
        setAppliedList(false);
      }
      if (tab === "applied") {
        setAppliedList(true);
        setSavedList(false);
      }
    } else setSavedList(true);
  }, [new URLSearchParams(search).get("tab")]);

  const getData = () => {
    getSavedJobsByJobseekerId(user.id)
      .then((res) => {
        setSavedListData(res.data);
        return getAppliedJobsByJobseekerId(user.id);
      })
      .then((res) => setAppliedListData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, []);

  return (
    <div>
      <MainHeader currentTab="profile"></MainHeader>
      <Grid container direction="row">
        <Grid item xs={2} />
        <Grid item container direction="column" xs={8}>
          <Grid
            item
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              textAlign: "left",
              marginTop: "16px",
            }}
          >
            My jobs
          </Grid>
          <Grid item>
            <MyJobsAppbar />
            <Divider />
          </Grid>
          <ReturnJobList />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps, {})(MyJobs);
