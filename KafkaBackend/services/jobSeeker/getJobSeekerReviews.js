const CompanyReviews = require("../../Models/CompanyReviews");

const handle_request = async (msg, callback) => {
  try {
    let companyReviews = [];
    companyReviews = await CompanyReviews.find({
      applicantId: parseInt(msg.id),
    });

    if (companyReviews) {
      callback(null, companyReviews);
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
