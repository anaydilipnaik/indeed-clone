const CompanyReviews = require("../../Models/CompanyReviews");

function handle_request(msg, callback) {
  let newReview = new CompanyReviews({
    applicantId: msg.applicantId,
    companyId: msg.companyId,
    reviewTitle: msg.reviewTitle,
    jobTitle: msg.jobTitle,
    location: msg.location,
    review: msg.review,
    rating: msg.rating,
    isFeatured: msg.isFeatured,
    isHelpful: msg.isHelpful,
    isNotHelpful: msg.isNotHelpful,
    createdAt: new Date(),
  });
  newReview.save((error, doc) => {
    if (error) {
      callback(error, "Error");
    } else {
      callback(null, doc);
    }
  });
}

exports.handle_request = handle_request;
