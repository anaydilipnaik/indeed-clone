const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CompanyReviewsSchema = new Schema(
  {
    applicantId: { type: Number, required: true },
    companyId: { type: Number, required: true },
    companyName: { type: String, required: false },
    applicantName: { type: String, required: false },
    reviewTitle: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: false },
    ceoRating: { type: Number, required: false },
    status: { type: String, required: false, default: "Pending" },
    isFeatured: { type: Boolean, required: false },
    isHelpful: { type: Number, required: false },
    isNotHelpful: { type: Number, required: false },
    createdAt: { type: Date, required: true },
    modifiedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
  }
);

const CompanyReviews = mongoose.model("companyreview", CompanyReviewsSchema);
module.exports = CompanyReviews;
