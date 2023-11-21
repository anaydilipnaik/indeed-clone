const con = require("../../sqldbConfig");

function handle_request(msg, callback) {
  let query = "select * from employers where id = " + msg;
  con.query(query, (err, results) => {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, results);
    }
  });
}

exports.handle_request = handle_request;
