const pool = require("../queryBuilder");

function handle_request(msg, callback) {
  pool.get_connection((qb) => {
    qb.insert("jobapplications", msg, (err, results) => {
      if (err) callback(err, "Error");
      else callback(null, "Success");
    });
  });
}

exports.handle_request = handle_request;
