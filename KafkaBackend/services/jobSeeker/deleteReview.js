const CompanyReviews = require("../../Models/CompanyReviews");

const handle_request = async (msg, callback) => {
  try {
    if (msg) {
      await CompanyReviews.findOneAndDelete({
        _id: msg._id,
      }).exec();

      callback(null, { message: "Review deleetd" });
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
