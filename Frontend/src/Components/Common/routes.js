import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import CompanyReviews from "../JobSeeker/companyReviews";
import FindJobs from "../JobSeeker/findJobs";
import ProtectedRouter from "./protectedRouter";
import FindSalaries from "../JobSeeker/findSalaries";
import EmployersHeader from "../Employer/EmployersHeader";
import SignIn from "../JobSeeker/signIn";
import Register from "../JobSeeker/register";
import EmployersJobPost from "../Employer/employersJobPost";
import EmployersJobDetails from "../Employer/employersJobDetails";
import EmployersJobCompensation from "../Employer/employersJobCompensation";
import UploadResume from "../JobSeeker/uploadResume";
import Messaging from "../JobSeeker/messaging";
import JobSeekerProfile from "../JobSeeker/jobSeekerProfile";
import EmployerDashboard from "../Employer/employerDashboard";
import Messages from "../Employer/messages";
import Jobs from "../Employer/jobs";
import Analytics from "../Employer/analytics";
import CompanyLandingPage from "../JobSeeker/companyPage/companyLandingPage";
import MyReviews from "../JobSeeker/myReviews";
import EmployerProfile from "../Employer/EmployerProfile";
import EmployerReviews from "../Employer/Reviews";
import EmployerLandingPage from "../Employer/EmployerLandingPage";
import PostReview from "../JobSeeker/PostReview";
import PostSalary from "../JobSeeker/PostSalary";
import Applicants from "../Employer/applicants";
const Routes = () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={FindJobs} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/companyReviews" component={CompanyReviews} />
        <Route path="/company" component={CompanyLandingPage} />
        <Route path="/findSalaries" component={FindSalaries} />
        <Route path="/employersJobPost" component={EmployersJobPost} />
        <Route path="/employersJobDetails" component={EmployersJobDetails} />
        <Route path="/employersJobCompensation" component={EmployersJobCompensation} />
        <Route path="/uploadResume" component={UploadResume} />
        <Route path="/messaging" component={Messaging} />
        <Route path="/jobSeekerProfile" component={JobSeekerProfile} />
        <Route path="/employersPostJobs" component={EmployersJobPost} />
        <Route path="/employerHeader" component={EmployersHeader} />
        <Route path="/employerDashboard" component={EmployerDashboard} />
        <Route path="/employerMessages" component={Messages} />
        <Route path="/employerJobs" component={Jobs} />
        <Route path="/employerApplicants" component={Applicants} />
        <Route path="/employerAnalytics" component={Analytics} />
        <Route path="/myReviews" component={MyReviews} />
        <Route path="/employerProfile" component={EmployerProfile} />
        <Route path="/employerReviews" component={EmployerReviews} />
        <Route path="/employerLandingPage" component={EmployerLandingPage} />
        <Route path="/postReview" component={PostReview} />
        <Route path="/postSalary" component={PostSalary} />
        <Route path="*" component={ProtectedRouter} />
      </Switch>
    </Router>
  );
};

export default Routes;
