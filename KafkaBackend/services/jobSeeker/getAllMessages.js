const Messages = require("../../Models/Messages");

const handle_request = async (msg, callback) => {
  try {
    let messages = await Messages.find({
      applicantId: parseInt(msg.applicantId),
      companyId: parseInt(msg.companyId),
    }).sort({ createdAt: 1 });

    if (messages) {
      callback(null, messages);
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
