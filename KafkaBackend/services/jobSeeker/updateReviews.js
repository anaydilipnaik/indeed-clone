const CompanyReviews = require("../../Models/CompanyReviews");

function handle_request(msg, callback) {
  CompanyReviews.findOneAndUpdate(
    { _id: msg.id },
    {
      isHelpful: msg.isHelpful,
      isNotHelpful: msg.isNotHelpful,
    },
    { new: true },
    (err, doc) => {
      if (!err) {
        callback(null, doc);
      } else {
        callback(error, "Error");
      }
    }
  );
}

exports.handle_request = handle_request;
