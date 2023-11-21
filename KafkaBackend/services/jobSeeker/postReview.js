const CompanyReviews = require("../../Models/CompanyReviews");

const handle_request = async (msg, callback) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  try {
    const Review = new CompanyReviews({
      ...msg,
      createdAt: date_ob,
    });

    Review.save();

    callback(null, { message: "Success" });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
