const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const con = require("../sqlDbConfig");

// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");

const { mongoDB } = require("../mongoDBconfig");
const mongoose = require("mongoose");
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

// const CompanyReviews = require("../models/CompanyReviews");

const Redis = require("redis");
const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600;

const jwt = require("jsonwebtoken");
const { secret } = require("../mongoDBconfig");

router.get("/getJobsList", function (req, res) {
  kafka.make_request("getJobsList", req.query, function (err, results) {
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

router.put("/reviews/featured", function (req, res) {
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

router.get("/reviews/company/companyid", function (req, res) {
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

// router.get("/reviews/company/:companyid", async (req, res, next) => {
//   const companyId = req.params.companyid;
//   redisClient.get(`reviews?companyId=${companyId}`, async (error, reviews) => {
//     if (error) console.log(error);
//     if (reviews != null) {
//       return res.json(JSON.parse(reviews));
//     } else {
//       CompanyReviews.find({ companyId: companyId }, (error, result) => {
//         if (error) {
//           res.json("error");
//         } else {
//           redisClient.setex(
//             `reviews?companyId=${companyId}`,
//             DEFAULT_EXPIRATION,
//             JSON.stringify(result)
//           );
//           res.json(result);
//         }
//       });
//     }
//   });
//   kafka.make_request(
//     "get_reviews_by_company_id0",
//     req.params.companyid,
//     function (err, results) {
//       if (err) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.end("Error Occured");
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "application/json",
//         });
//         res.end(JSON.stringify(results));
//       }
//     }
//   );
// });

router.get("/getprofile/company/:companyid", async (req, res, next) => {
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

router.put("/updateprofile/company", async (req, res, next) => {
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

// Common Login
router.post("/commonLogin", async (req, res, next) => {
  kafka.make_request("login_common", req.body, function (err, results) {
    if (err) {
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
router.post("/commonRegister", async (req, res, next) => {
  console.log("in kafka.make_request backend routes");
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
router.get("/savedJobs/get/:jobseekerid", async (req, res, next) => {
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

// Delete saved job
router.post("/savedJobs/delete/:savedjobid", async (req, res, next) => {
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
router.get("/appliedJobs/get/:jobseekerid", async (req, res, next) => {
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
router.post("/applyJob", async (req, res, next) => {
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
router.get("/reviewsperday", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 5 Reviewed Companies
router.get("/mostreviewedcompanies", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 5 companies based on ratings
router.get("/avgratings", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 5 Job Seekers (reviews)
router.get("/jobseekerreviews", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Top 10 CEOs (ceoRating)
router.get("/topceos", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//DailyViews
router.get("/dailyviews", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//All Job Seeker Reviews
router.get("/allreviews", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Filter Reviews
router.post("/filterreviews", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Approve Reject review
router.post("/reviewactions", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//All companies in the system
router.get("/allcompanies", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//Search a company
router.post("/companysearch", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//View company reviews
router.post("/viewcompanyreview", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

//View company reviews
router.post("/viewjobstats", async (req, res, next) => {
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
        console.log("Inside results");
        console.log(results);
        res.send(results);
      }
    }
  );
});

module.exports = router;
