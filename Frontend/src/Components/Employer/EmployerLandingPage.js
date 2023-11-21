import React from "react";
import EmployersHeader from "./EmployersHeader";
import EmployerDashboard from "./employerDashboard";

const EmployerLandingPage = (props) => {
  return (
    <div>
      <EmployerDashboard currentTab="jobs"></EmployerDashboard>
    </div>
  );
};

export default EmployerLandingPage;
