const Messages = require("../../Models/Messages");
const MessagesModel = require("../../Models/Messages");

const handle_request = async (msg, callback) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  try {
    const Message = new MessagesModel({
      ...msg,
      createdAt: date_ob,
    });

    Message.save();

    callback(null, { message: "Success" });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
