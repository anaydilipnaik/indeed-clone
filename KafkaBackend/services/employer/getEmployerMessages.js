const Messages = require("../../Models/Messages");

const handle_request = async (msg, callback) => {
  try {
    let messages = await Messages.find({
        companyId: parseInt(msg.id),
    });

    let newArray = {};

    messages.forEach((msg) => {
      newArray = {
        ...newArray,
        [msg.applicantId]: msg.applicantName,
      };
    });

    if (newArray) {
      callback(null, newArray);
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
