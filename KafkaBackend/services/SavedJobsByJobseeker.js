const con = require("../sqldbConfig");

function handle_request(msg, callback) {
  let query =
    "select s.id, e.id as companyId, j.id as jobId, j.jobTitle, e.companyLogo, e.companyName, e.address " +
    "from savedjobs s, jobs j, employers e " +
    "where s.active = 1 and s.jobId = j.id and j.companyId = e.id and s.applicantId = " +
    msg +
    " order by s.createdAt desc";
  con.query(query, (err, results) => {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, results);
    }
  });
}

exports.handle_request = handle_request;
