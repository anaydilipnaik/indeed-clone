const con = require("../sqldbConfig");
const CompanyReviews = require("../Models/CompanyReviews");

exports.handle_request = function admin(msg, callback) {
  console.log("admin path:", msg.path);
  switch (msg.path) {
    case "reviewsperday":
      reviewsperday(msg, callback);
      break;
    case "mostreviewedcompanies":
      mostreviewedcompanies(msg, callback);
      break;
    case "avgratings":
      avgratings(msg, callback);
      break;
    case "jobseekerreviews":
      jobseekerreviews(msg, callback);
      break;
    case "topceos":
      topceos(msg, callback);
      break;
    case "dailyviews":
      dailyviews(msg, callback);
      break;
  }
};

function reviewsperday(msg, callback) {
  console.log("Inside reviewsperday kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.aggregate(
    [
      {
        $project: {
          createdAt: { $dateToString: { format: "%m-%d", date: "$createdAt" } },
        },
      },
      { $group: { _id: { createdAt: "$createdAt" }, count: { $sum: 1 } } },
      { $addFields: { createdAt: "$_id.createdAt" } },
      { $sort: { createdAt: -1 } },
      { $limit: 7 },
      { $sort: { createdAt: 1 } },
      { $project: { createdAt: "$createdAt", count: 1, _id: false } },
    ],
    async (error, results) => {
      // console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        callback(null, results);
      }
    }
  );
}

function mostreviewedcompanies(msg, callback) {
  console.log("Inside mostreviewedcompanies kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.aggregate(
    [
      { $group: { _id: { companyName: "$companyName" }, count: { $sum: 1 } } },
      { $addFields: { companyName: "$_id.companyName" } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { companyName: "$companyName", count: 1, _id: 0 } },
    ],
    async (error, results) => {
      // console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        callback(null, results);
      }
    }
  );
}

function avgratings(msg, callback) {
  console.log("Inside avgratings kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.aggregate(
    [
      { $match: { status: "Approved" } },
      {
        $group: {
          _id: { companyName: "$companyName" },
          avgrating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      { $addFields: { companyName: "$_id.companyName" } },
      { $sort: { avgrating: -1 } },
      { $limit: 5 },
      {
        $project: {
          companyName: "$companyName",
          count: 1,
          avgrating: 1,
          _id: 0,
        },
      },
    ],
    async (error, results) => {
      // console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        callback(null, results);
      }
    }
  );
}

function jobseekerreviews(msg, callback) {
  console.log("Inside jobseekerreviews kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.aggregate(
    [
      { $match: { status: "Approved" } },
      {
        $group: {
          _id: { applicantName: "$applicantName" },
          count: { $sum: 1 },
        },
      },
      { $addFields: { applicantName: "$_id.applicantName" } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { applicantName: "$applicantName", count: 1, _id: 0 } },
    ],
    async (error, results) => {
      // console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        callback(null, results);
      }
    }
  );
}

function topceos(msg, callback) {
  console.log("Inside topceos kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  con.query(
    "SELECT ceoName, ceoRating FROM indeed.employers order by ceoRating DESC LIMIT 10",
    async (error, results) => {
      // console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        callback(null, results);
      }
    }
  );
}

function dailyviews(msg, callback) {
  console.log("Inside dailyviews kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  var d = new Date();
  var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  console.log(today);
  let dailyViewsS =
    "SELECT employerName, dailyViews FROM indeed.employers WHERE dateVisited = ? order by dailyViews DESC LIMIT 10";
  con.query(dailyViewsS, [today], async (error, results) => {
    // console.log(results);
    if (error) {
      callback(null, { err: err });
      console.log(err);
    } else {
      callback(null, results);
    }
  });
}
