const { mongoDB } = require("./mongoDBConfig");
const mongoose = require("mongoose");
// const con = require("./sqlDbConfig");
//Here

//topics files
var CompanyReviews = require("./services/CompanyReviews.js");
var GetEmployerProfile = require("./services/GetEmployerProfile");
var UpdateEmployerProfile = require("./services/PutEmployerProfile");
var AddCompanyReview = require("./services/jobSeeker/AddCompanyReview.js");
var LoginCommon = require("./services/LoginCommon.js");
var RegisterCommon = require("./services/RegisterCommon.js");
var SavedJobsByJobseeker = require("./services/SavedJobsByJobseeker.js");
var DeleteSavedJob = require("./services/DeleteSavedJob.js");
var AppliedJobsByJobseeker = require("./services/AppliedJobsByJobseeker.js");
var ApplyJob = require("./services/ApplyJob.js");
var FeaturedReviews = require("./services/FeaturedReviews");
var PutDescEmployer = require("./services/PutDescriptionEmployer");

var UpdateDateAndViewCount = require("./services/jobSeeker/updateDateAndViewCount");
var PostReply = require("./services/jobSeeker/postReply.js");
var JobList = require("./services/jobSeeker/getJobList.js");
var JobSeekerDetails = require("./services/jobSeeker/getJobSeekerDetails.js");
var UpdateJobSeekerDetails = require("./services/jobSeeker/updateJobSeekerDetails.js");
var GetJobSeekerReviews = require("./services/jobSeeker/getJobSeekerReviews");
var SaveJob = require("./services/jobSeeker/saveJob.js");
var GetSaveJobs = require("./services/jobSeeker/getSaveJobs.js");
var WhatTypeAheadList = require("./services/jobSeeker/getwhatTypeAheadList.js");
var WhereTypeAheadList = require("./services/jobSeeker/getwhereTypeAheadList.js");
var GetMessages = require("./services/jobSeeker/getMessages.js");
var GetAllMessages = require("./services/jobSeeker/getAllMessages.js");
var admin = require("./services/admin.js");
var adminReview = require("./services/adminReview.js");
var adminCompany = require("./services/adminCompany.js");
var UpdateResume = require("./services/jobSeeker/updateResume.js");
var DeleteResume = require("./services/jobSeeker/deleteResume");
var DeleteReview = require("./services/jobSeeker/deleteReview");
var PostReview = require("./services/jobSeeker/postReview");
var PostSalary = require("./services/jobSeeker/postSalary");
var FindCompanyReviews = require("./services/jobSeeker/findCompanyReviews");
var JobDetails = require("./services/jobSeeker/getJobDetails");
var UpdateBanner = require("./services/updateCompanyBanner");
var UpdateLogo = require("./services/updateCompanyLogo");
var CompanyDetailsById = require("./services/jobSeeker/companyDetailsById");
var UpdateReviews = require("./services/jobSeeker/updateReviews");

var getCompanyJobPosts = require("./services/employer/getCompanyJobPosts.js");
var getJobApplicants = require("./services/employer/getJobApplicants.js");
var postJob = require("./services/employer/postJob");
var postJob = require("./services/employer/postJob");
var getEmployerMessages = require("./services/employer/getEmployerMessages");
var connection = new require("./Connection");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 500,
  wtimeoutMS: 2500,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log("MongoDB connection failed");
  } else {
    console.log("MongoDB connected!!");
  }
});

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      console.log("after handle", res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];

      producer.send(payloads, function (err, data) {
        console.log("error", err);
        console.log("data", data);
      });
      return;
    });
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("get_reviews_by_company_id0", CompanyReviews);
handleTopicRequest("get_reviews_by_company_id", CompanyReviews);
handleTopicRequest("post_company_review", AddCompanyReview);
handleTopicRequest("login_common", LoginCommon);
handleTopicRequest("register_common", RegisterCommon);
handleTopicRequest("get_saved_jobs_by_jobseeker_id", SavedJobsByJobseeker);
handleTopicRequest("delete_saved_job", DeleteSavedJob);
handleTopicRequest("get_applied_jobs_by_jobseeker_id", AppliedJobsByJobseeker);
handleTopicRequest("apply_job", ApplyJob);
handleTopicRequest("reviews_featured", FeaturedReviews);
//handleTopicRequest("get_reviews_by_company_id0", CompanyReviews);
handleTopicRequest("post_company_review", AddCompanyReview);
handleTopicRequest("get_company_profile_by_company_id", GetEmployerProfile);
handleTopicRequest("put_company_profile_by_company_id", UpdateEmployerProfile);
// handleTopicRequest("get_reviews_by_company_id0", CompanyReviews);
// handleTopicRequest("post_company_review", AddCompanyReview);
handleTopicRequest("getJobsList", JobList);
handleTopicRequest("getJobSeekerDetails", JobSeekerDetails);
handleTopicRequest("updateJobSeekerDetails", UpdateJobSeekerDetails);
handleTopicRequest("getJobSeekerReviews", GetJobSeekerReviews);
handleTopicRequest("whatTypeAheadList", WhatTypeAheadList);
handleTopicRequest("whereTypeAheadList", WhereTypeAheadList);
handleTopicRequest("saveJob", SaveJob);
handleTopicRequest("getSaveJob", GetSaveJobs);

handleTopicRequest("admin", admin);
handleTopicRequest("adminReview", adminReview);
handleTopicRequest("adminCompany", adminCompany);
handleTopicRequest("updateResume", UpdateResume);
handleTopicRequest("deleteResume", DeleteResume);
handleTopicRequest("deleteReview", DeleteReview);
handleTopicRequest("getMessages", GetMessages);
handleTopicRequest("getAllMessages", GetAllMessages);
handleTopicRequest("postReply", PostReply);

handleTopicRequest("updateBanner", UpdateBanner);
handleTopicRequest("updateLogo", UpdateLogo);

handleTopicRequest("putDescEmp", PutDescEmployer);

handleTopicRequest("postReview", PostReview);
handleTopicRequest("postSalary", PostSalary);
handleTopicRequest("findCompanyReviews", FindCompanyReviews);
handleTopicRequest("get_job_details_by_id", JobDetails);

handleTopicRequest("get_jobs_posted_by_company", getCompanyJobPosts);
handleTopicRequest("get_job_applicants_by_jobId", getJobApplicants);
handleTopicRequest("post_new_job", postJob);
handleTopicRequest("get_company_details_by_id", CompanyDetailsById);
handleTopicRequest("update_reviews", UpdateReviews);
handleTopicRequest("getEmployerMessages", getEmployerMessages);

handleTopicRequest("updateDateAndViewCount", UpdateDateAndViewCount);
