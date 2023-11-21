const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let updateSQL = `UPDATE  jobseekers  set resumeURI = ? , resumeFilename= ?  where  id = ?`;

    con.query(updateSQL, [null, null, msg.id], (err, result) => {
      if (result) {
        callback(null, { message: "Resume deleted" });
      } else throw err;
    });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
