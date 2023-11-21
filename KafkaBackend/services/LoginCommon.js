const con = require("../sqldbConfig");
var crypto = require("crypto");

function handle_request(msg, callback) {
  console.log("Inside the Function!!!");
  let table = "";

  if (msg.personaType === "js") table = "jobseekers";
  else if (msg.personaType === "e") table = "employers";
  else table = "admins";
  let query =
    "select t.*, '" +
    msg.personaType +
    "' as personaType from " +
    table +
    " t where t.email = '" +
    msg.email +
    "' and t.password = '" +
    msg.password +
    "'";
  con.query(query, (err, results) => {
    if (err) {
      console.log("error kya h", err);
      callback(err, "Error");
    } else {
      if (results.length > 0) {
        results[0].password = crypto
          .createHash("md5")
          .update(msg.password)
          .digest("hex");
        callback(null, results);
      } else callback(err, "Invalid Credentials");
    }
  });
}

exports.handle_request = handle_request;
