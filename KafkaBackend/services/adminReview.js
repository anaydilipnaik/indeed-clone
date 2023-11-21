const con = require("../sqldbConfig");
const CompanyReviews = require("../Models/CompanyReviews");

exports.handle_request = function admin(msg, callback) {
  console.log("admin path:", msg.path);
  switch (msg.path) {
    case "allreviews":
      allreviews(msg, callback);
      break;
    case "filterreviews":
      filterreviews(msg, callback);
      break;
    case "reviewactions":
      reviewactions(msg, callback);
      break;
  }
};

function allreviews(msg, callback) {
  console.log("Inside allreviews kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.find({}, async (error, results) => {
    // console.log(results);
    if (error) {
      callback(null, { err: err });
      console.log(err);
    } else {
      callback(null, results);
    }
  });
}

function filterreviews(msg, callback) {
  console.log("Inside filterreviews kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.find({ status: msg.body.filter }, async (error, results) => {
    // console.log(results);
    if (error) {
      callback(null, { err: err });
      console.log(err);
    } else {
      callback(null, results);
    }
  });
}

function reviewactions(msg, callback) {
  console.log("Inside reviewactions kafka backend");
  // console.log(msg);
  console.log("In handle request:" + JSON.stringify(msg));
  CompanyReviews.findOneAndUpdate(
    { _id: msg.body.id },
    { $set: { status: msg.body.status } },
    async (error, results) => {
      //   console.log(results);
      if (error) {
        callback(null, { err: err });
        console.log(err);
      } else {
        setValue(results.companyName);
        callback(null, results);
      }
    }
  );

  function setValue(value) {
    fCompName = value;
    console.log(fCompName);
    CompanyReviews.aggregate(
      [
        { $match: { companyName: fCompName } },
        {
          $group: {
            _id: { companyName: "$companyName" },
            avgrating: { $avg: "$rating" },
            avgceorating: { $avg: "$ceoRating" },
            count: { $sum: 1 },
          },
        },
        { $addFields: { companyName: "$_id.companyName" } },
        {
          $project: {
            companyName: "$companyName",
            count: 1,
            avgrating: 1,
            avgceorating: 1,
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
          sqlUpdate(results);
        }
      }
    );
  }

  function sqlUpdate(sqlup) {
    console.log(sqlup);
    let sqlUpdate =
      "UPDATE indeed.employers " +
      "SET averageRating = ?, ceoRating= ?, totalReviews= ? WHERE companyName = ?";
    con.query(
      sqlUpdate,
      [
        sqlup[0].avgrating,
        sqlup[0].avgceorating,
        sqlup[0].count,
        sqlup[0].companyName,
      ],
      async (error, results) => {
        //   console.log(results);
        if (error) {
          callback(null, { err: err });
          console.log(err);
        } else {
          console.log("MySQL Updated!");
        }
      }
    );
  }
}
