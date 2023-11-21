const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MessagesSchema = new Schema(
  {
    applicantId: { type: Number, required: true },
    companyId: { type: Number, required: true },
    companyName: { type: String, required: false },
    applicantName: { type: String, required: false },
    messageSender: { type: String, required: false },
    messageContent: { type: String, required: true },
    createdAt: { type: Date, required: true },
    modifiedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
  }
);

const Messages = mongoose.model("messages", MessagesSchema);
module.exports = Messages;
