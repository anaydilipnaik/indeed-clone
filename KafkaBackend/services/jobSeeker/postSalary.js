const Salaries = require("../../Models/Salaries");

const handle_request = async (msg, callback) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  try {
    const Salary = new Salaries({
      ...msg,
      createdAt: date_ob,
    });

    Salary.save();

    callback(null, { message: "Success" });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
