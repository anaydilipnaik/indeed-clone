import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import UploadResume from "../JobSeeker/uploadResume";
import Messaging from "../JobSeeker/messaging";
import JobSeekerProfile from "../JobSeeker/jobSeekerProfile";
import Messages from "../Employer/messages";
import Jobs from "../Employer/jobs";
import Applicants from "../Employer/applicants";
import ApplyJob from "../JobSeeker/apply/applyJob";
import MyJobs from "../JobSeeker/myJobs";
import MyReviews from "../JobSeeker/myReviews";

const ProtectedRouter = ({ history }) => {
  const userId = useSelector((state) => state.login.user.id);

  if (userId === undefined) {
    console.log("I am in protected Router");
    history.push("/");
    return <div></div>;
  } else {
    return (
      <>
        <Route path="/myjobs" component={MyJobs} />
        <Route path="/uploadResume" component={UploadResume} />
        <Route path="/messaging" component={Messaging} />
        <Route path="/jobSeekerProfile" component={JobSeekerProfile} />
        <Route path="/employerMessages" component={Messages} />
        <Route path="/employerJobs" component={Jobs} />
        <Route path="/employerApplicants" component={Applicants} />
        <Route path="/apply" component={ApplyJob} />
        <Route path="/myReviews" component={MyReviews} />
      </>
    );
  }
};

export default ProtectedRouter;
