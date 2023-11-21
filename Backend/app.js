// created by Archita

const express = require("express");
const cors = require("cors");
const con = require("./sqlDbConfig");
const { mongoDB } = require("./mongoDBconfig");

// const { mongoDB } = require("./mongoDBconfig");
const mongoose = require("mongoose");

const kafka = require("./kafka/client");

// const Router = require("./routes");
const path = require("path");
var bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const { secret } = require("./mongoDBconfig");
// const passport = require("passport");
// const { checkAuth } = require("./Controller/Common/passport");
// const { auth } = require("./Controller/Common/passport");

const app = express();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

//const Redis = require("redis");
//const redisClient = Redis.createClient();
//const DEFAULT_EXPIRATION = 3600;

const s3 = new AWS.S3({
  accessKeyId: "AKIAZJZS76WTOJJJGHU3",
  secretAccessKey: "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",
});

app.use(express.json());
app.use(cors());
// app.use(passport.initialize());

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // maxPoolSize: 500,
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

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "ubereatsimages-273",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "/images")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     console.log("File name : ", file);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// auth();
// var upload = multer({ storage: storage });

//------------------------------------------------------------------------------
app.post("/getJobsList", function (req, res) {
  kafka.make_request("getJobsList", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getJobSeekerDetails", function (req, res) {
  kafka.make_request("getJobSeekerDetails", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/updateJobSeekerDetails", function (req, res) {
  kafka.make_request(
    "updateJobSeekerDetails",
    req.body,
    function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        res.status(200).json(results);
        res.end();
      }
    }
  );
});

app.get("/getJobSeekerReviews", function (req, res) {
  kafka.make_request("getJobSeekerReviews", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getWhatTypeAheadList", function (req, res) {
  kafka.make_request("whatTypeAheadList", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getWhereTypeAheadList", function (req, res) {
  kafka.make_request("whereTypeAheadList", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getMessages", function (req, res) {
  kafka.make_request("getMessages", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getEmployerMessages", function (req, res) {
  kafka.make_request("getEmployerMessages", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else********************");
      res.status(200).json(results);
      res.end();
    }
  });
});

// app.get("/getMessages", function (req, res) {
//   let userId = req.query.userId;
//   redisClient.get(`getMessages?id=${userId}`, async (error, results) => {
//     if (error) console.log(error);
//     if (results != null) {
//       return res.json(JSON.parse(results));
//     } else {
//       kafka.make_request("getMessages", req.query, function (err, results) {
//         console.log("in result");
//         console.log(results);
//         if (err) {
//           console.log("Inside err");
//           res.json({
//             status: "error",
//             msg: "System Error, Try Again.",
//           });
//         } else {
//           console.log("Inside else");
//           redisClient.setex(
//             `getMessages?id=${userId}`,
//             DEFAULT_EXPIRATION,
//             JSON.stringify(results)
//           );
//           // res.json(result);
//           res.status(200).json(results);
//           res.end();
//         }
//       });
//     }
//   });
// });

app.get("/getAllMessages", function (req, res) {
  kafka.make_request("getAllMessages", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/saveJob", function (req, res) {
  kafka.make_request("saveJob", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/postReply", function (req, res) {
  kafka.make_request("postReply", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getSaveJob", function (req, res) {
  kafka.make_request("getSaveJob", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/updateResume", uploadS3.single("file"), function (req, res) {
  console.log("req.body", req.body);
  req.body.file = req.file?.location;
  req.body.originalname = req.file?.originalname;
  console.log("req.file", req.file);
  kafka.make_request("updateResume", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/deleteResume", function (req, res) {
  // console.log("req.body", req.body);
  // req.body.file = req.file?.location;
  // req.body.originalname = req.file?.originalname;
  // console.log("req.file", req.file);
  var params = { Bucket: "ubereatsimages-273", Key: req.bodyresumeURI };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else console.log(data); // deleted
  });
  kafka.make_request("deleteResume", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/deleteReview", function (req, res) {
  kafka.make_request("deleteReview", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

// anay's

app.post("/findCompanyReviews", function (req, res) {
  kafka.make_request("findCompanyReviews", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
    }
  });
});

app.post("/postReview", function (req, res) {
  kafka.make_request("postReview", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end("Success");
    }
  });
});
app.put("/reviews/featured", function (req, res) {
  console.log(req.query);
  kafka.make_request("reviews_featured", req.query, function (err, results) {
    console.log("in /reviews/featured");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/reviews/company/companyid", function (req, res) {
  kafka.make_request(
    "get_reviews_by_company_id",
    req.query,
    function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else ", JSON.stringify(results));
        res.status(200).send(results);
        res.end();
      }
    }
  );
});

app.get("/getprofile/company/:companyid", async (req, res, next) => {
  console.log("GET Request on Profile : ", req.query);
  kafka.make_request(
    "get_company_profile_by_company_id",
    req.query,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

app.put("/updateprofile/company", async (req, res, next) => {
  console.log("Request is " + req.body);
  kafka.make_request(
    "put_company_profile_by_company_id",
    req.body,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        console.log("Profile Updated Successfully!");
        res.status(200).end(JSON.stringify(results));
      }
    }
  );
});

app.post("/postSalary", function (req, res) {
  kafka.make_request("postSalary", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end("Success");
    }
  });
});

app.post("/commonLogin", async (req, res) => {
  console.log("Inside Route in app.js");
  kafka.make_request("login_common", req.body, function (err, results) {
    if (err) {
      console.log("Error " + err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      let finalData = [];
      finalData.push(results);
      const payload = { _id: results.id, email: results.email };
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });
      finalData.push(token);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(finalData));
    }
  });
});

// Common Register
app.post("/commonRegister", async (req, res) => {
  console.log("in kafka.make_request app.js");
  kafka.make_request("register_common", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(results);
    }
  });
});

// Get Saved Jobs by Jobseeker Id
app.get("/savedJobs/get/:jobseekerid", async (req, res) => {
  kafka.make_request(
    "get_saved_jobs_by_jobseeker_id",
    req.params.jobseekerid,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// Get Company Details by ID
app.get("/companydetails/get/:companyid", async (req, res) => {
  kafka.make_request(
    "get_company_details_by_id",
    req.params.companyid,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// Get Job Details by ID
app.get("/jobdetails/get/:jobid", async (req, res) => {
  kafka.make_request(
    "get_job_details_by_id",
    req.params.jobid,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// Delete saved job
app.post("/savedJobs/delete/:savedjobid", async (req, res) => {
  req.body.savedjobid = req.params.savedjobid;
  kafka.make_request("delete_saved_job", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
    }
  });
});

// Get Applied Jobs by Jobseeker Id
app.get("/appliedJobs/get/:jobseekerid", async (req, res) => {
  kafka.make_request(
    "get_applied_jobs_by_jobseeker_id",
    req.params.jobseekerid,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

// Apply for a job
app.post("/applyJob", uploadS3.single("resumeURI"), async (req, res) => {
  req.body.resumeURI = req.file?.location;
  kafka.make_request("apply_job", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(results);
    }
  });
});

//Reviews Per Day
app.get("/reviewsperday", async (req, res, next) => {
  console.log("GET Request on reviews");
  kafka.make_request(
    "admin",
    { path: "reviewsperday", body: req.body },
    function (err, results) {
      console.log("GET Request on reviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});
// *****************EMPLOYER'S APIs*********************
app.post("/getCompanyJobPosts", function (req, res) {
  // console.log("in app getCompanyJobPosts",req.query);
  kafka.make_request(
    "get_jobs_posted_by_company",
    req.body,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

app.get("/getJobApplicants", function (req, res) {
  // console.log("in app getJobApplicants",req.query);
  kafka.make_request(
    "get_job_applicants_by_jobId",
    req.query,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

app.post("/postJob", function (req, res) {
  console.log("in app postJob", req.body);
  kafka.make_request("post_new_job", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
    }
  });
});

//Top 5 Reviewed Companies
app.get("/mostreviewedcompanies", async (req, res, next) => {
  console.log("GET Request on mostreviews");
  kafka.make_request(
    "admin",
    { path: "mostreviewedcompanies", body: req.body },
    function (err, results) {
      console.log("GET Request on mostreviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 5 companies based on ratings
app.get("/avgratings", async (req, res, next) => {
  console.log("GET Request on avgRatings");
  kafka.make_request(
    "admin",
    { path: "avgratings", body: req.body },
    function (err, results) {
      console.log("GET Request on avgratings");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 5 Job Seekers (reviews)
app.get("/jobseekerreviews", async (req, res, next) => {
  console.log("GET Request on jobseekerreviews");
  kafka.make_request(
    "admin",
    { path: "jobseekerreviews", body: req.body },
    function (err, results) {
      console.log("GET Request on jobseekerreviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 10 CEOs (ceoRating)
app.get("/topceos", async (req, res, next) => {
  console.log("GET Request on topceos");
  kafka.make_request(
    "admin",
    { path: "topceos", body: req.body },
    function (err, results) {
      console.log("GET Request on topceos");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//DailyViews
app.get("/dailyviews", async (req, res, next) => {
  console.log("GET Request on dailyviews");
  kafka.make_request(
    "admin",
    { path: "dailyviews", body: req.body },
    function (err, results) {
      console.log("GET Request on dailyviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//All Job Seeker Reviews
app.get("/allreviews", async (req, res, next) => {
  console.log("GET Request on allreviews");
  kafka.make_request(
    "adminReview",
    { path: "allreviews", body: req.body },
    function (err, results) {
      console.log("GET Request on allreviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//Filter Reviews
app.post("/filterreviews", async (req, res, next) => {
  console.log("GET Request on filterreviews");
  kafka.make_request(
    "adminReview",
    { path: "filterreviews", body: req.body },
    function (err, results) {
      console.log("GET Request on filterreviews");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

app.put("/reviews/update/helpfulness", async (req, res) => {
  kafka.make_request("update_reviews", req.body, function (err, results) {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(results));
    }
  });
});

app.post("/updateDateAndViewCount", function (req, res) {
  kafka.make_request(
    "updateDateAndViewCount",
    req.body,
    function (err, results) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end("Success");
      }
    }
  );
});

//Approve Reject review
app.post("/reviewactions", async (req, res, next) => {
  console.log("Post Request on reviewactions");
  // console.log(req.body);
  kafka.make_request(
    "adminReview",
    { path: "reviewactions", body: req.body },
    function (err, results) {
      console.log("GET Request on reviewactions");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//All companies in the system
app.get("/allcompanies", async (req, res, next) => {
  console.log("GET Request on allcompanies");
  kafka.make_request(
    "adminCompany",
    { path: "allcompanies", body: req.body },
    function (err, results) {
      console.log("GET Request on allcompanies");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//Search a company
app.post("/companysearch", async (req, res, next) => {
  console.log("POST Request on companysearch");
  kafka.make_request(
    "adminCompany",
    { path: "companysearch", body: req.body },
    function (err, results) {
      console.log("GET Request on companysearch");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//View company reviews
app.post("/viewcompanyreview", async (req, res, next) => {
  console.log("POST Request on viewcompanyreview");
  kafka.make_request(
    "adminCompany",
    { path: "viewcompanyreview", body: req.body },
    function (err, results) {
      console.log("GET Request on viewcompanyreview");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

//View company reviews
app.post("/viewjobstats", async (req, res, next) => {
  console.log("POST Request on viewjobstats");
  kafka.make_request(
    "adminCompany",
    { path: "viewjobstats", body: req.body },
    function (err, results) {
      console.log("GET Request on viewjobstats");
      // console.log(results);
      if (err) {
        console.log("Inside err");
      } else {
        // console.log("Inside results");
        // console.log(results);
        res.send(results);
      }
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
