const con = require("../../sqldbConfig");

function handle_request(msg, callback) {
  let query =
    "select e.companyLogo, e.companyName, j.* " +
    "from jobs j, employers e " +
    "where j.companyId = e.id and j.id = " +
    msg;
  con.query(query, (err, results) => {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, results);
    }
  });
}

exports.handle_request = handle_request;
