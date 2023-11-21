const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SalariesSchema = new Schema(
  {
    applicantId: { type: Number, required: true },
    applicantName: { type: String, required: true },
    companyName: { type: String, required: true },
    isCurrent: { type: Boolean, required: false },
    endDate: { type: String, required: false },
    jobTitle: { type: String, required: true },
    location: { type: String, required: false },
    salary: { type: Number, required: true },
    yearsOfExperience: { type: Number, required: false },
    isPaidTimeOff: { type: Boolean, required: false },
    isHealthInsurance: { type: Boolean, required: false },
    isLifeInsurance: { type: Boolean, required: false },
    isDentalVisionInsurance: { type: Boolean, required: false },
    isRetirement401k: { type: Boolean, required: false },
    otherBenefits: { type: String, required: false },
    createdAt: { type: Date, required: true },
    modifiedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
  }
);

const Salaries = mongoose.model("salary", SalariesSchema);
module.exports = Salaries;
