const { state, resume } = require("../../sqldbConfig.js");
const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
    try {
    //   let sqlSelect = `SELECT  * FROM jobapplications where jobId = ?`;
      let sqlSelect = `SELECT jobapplications.*, jobseekers.firstName, jobseekers.lastName, jobseekers.resumeFilename from jobapplications join jobseekers on jobseekers.id=jobapplications.applicantId where jobapplications.jobId=?`;
      con.query(sqlSelect, [msg.id], (err, result) => {
        if (result) {
          callback(null,result);
        } else throw err;
      });
    } catch (exception) {
      callback({ message: exception }, null);
    }
  };
  exports.handle_request = handle_request;