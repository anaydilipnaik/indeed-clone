const pool = require("../queryBuilder");

function handle_request(msg, callback) {
  let table = "";
  if (msg.personaType === "js") table = "jobseekers";
  else table = "employers";
  delete msg.personaType;
  pool.get_connection((qb) => {
    qb.insert(table, msg, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          callback(err, "Email id already exists");
        else callback(err, "Error");
      } else {
        callback(null, "Success");
      }
    });
  });
}

exports.handle_request = handle_request;
