const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let selectSQL = `SELECT * from  savedjobs  where applicantId = ? and  jobId =? `;
    if (msg.applicantId) {
      con.query(selectSQL, [msg.applicantId, msg.jobId], (err, result) => {
        if (result.length > 0) {
          callback(null, {
            applicantId: result[0].applicantId,
            jobId: result[0].jobId,
            saved: true,
          });
        } else {
          callback(null, {
            applicantId: msg.applicantId,
            jobId: msg.jobId,
            saved: false,
          });
        }
      });
    } else throw err;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
