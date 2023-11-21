const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let updateSQL = `UPDATE  jobseekers  set resumeURI = ? , resumeFilename= ?  where  id = ?`;
    con.query(
      updateSQL,
      [msg.file, msg.originalname, msg.id],
      (err, result1) => {
        if (result1) {
          callback(null, { message: "Resume uploaded or Updated" });
        } else throw err;
      }
    );
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
