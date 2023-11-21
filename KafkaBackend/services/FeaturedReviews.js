const CompanyReviews = require("../Models/CompanyReviews");

function handle_request(msg, callback) {
  console.log("For puting reviews, Message is : ", msg);
  CompanyReviews.findByIdAndUpdate(
    { _id: msg.id },
    { $set: { isFeatured: msg.isFeatured } },
    (error, result) => {
      if (error) {
        callback(error, "Error");
      }
      if (result) {
        console.log("Found the review and updated Successfully!  ", result);
        callback(null, result);
      } else {
        console.log("Unknown Error ", result);
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
