const con = require("../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let updateSQL = `UPDATE  indeed.employers SET companyBanner = ?  where  email = ?`;
    con.query(updateSQL, [msg.file, msg.id], (err, result1) => {
      if (result1) {
        callback(null, { message: "Banner Uploaded " });
      } else throw err;
    });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
