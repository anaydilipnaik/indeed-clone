const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    if (msg.saved) {
      let insertSQL = `INSERT into savedjobs (applicantId, jobId) values (?,?) `;
      if (msg.applicantId) {
        con.query(insertSQL, [msg.applicantId, msg.jobId], (err, result) => {
          if (result) {
            callback(null, { message: "Job saved/unsaved" });
          } else throw err;
        });
      }
    } else {
      let deleteSQL = `DELETE FROM savedjobs WHERE applicantId = ? and  jobId = ?  `;
      if (msg.applicantId) {
        con.query(deleteSQL, [msg.applicantId, msg.jobId], (err, result) => {
          if (result) {
            callback(null, { message: "Job saved/unsaved" });
          } else throw err;
        });
      }
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
