const CompanyReviews = require("../models/CompanyReviews");

function handle_request(msg, callback) {
  console.log("For puting reviews, Message is : ", msg);
  CompanyReviews.findOne({ companyId: msg.companyId }, (error, result) => {
    if (error) {
      callback(error, "Error");
    }
    if (result) {
      console.log("Updated Successfully ", result);
      callback(null, result);
    } else {
      console.log("Unknown Error ", result);
      callback(null, result);
    }
  });
}

exports.handle_request = handle_request;
