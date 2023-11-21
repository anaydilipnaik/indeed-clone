const con = require("../sqldbConfig");

function handle_request(msg, callback) {
  let query =
    "select ja.id, e.id as companyId, j.id as jobId, j.jobTitle, e.companyLogo, e.companyName, e.address " +
    "from jobapplications ja, jobs j, employers e " +
    "where ja.jobId = j.id and j.companyId = e.id and ja.applicantId = " +
    msg +
    " order by ja.createdAt desc";
  con.query(query, (err, results) => {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, results);
    }
  });
}

exports.handle_request = handle_request;
