const Messages = require("../../Models/Messages");

const handle_request = async (msg, callback) => {
  try {
    let messages = await Messages.find({
      applicantId: parseInt(msg.id),
    });

    let newArray = {};

    messages.forEach((msg) => {
      newArray = {
        ...newArray,
        [msg.companyId]: msg.companyName,
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
