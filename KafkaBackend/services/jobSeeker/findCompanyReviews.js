const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  let query =
    "select id, companyName, companyLogo, missionAndVision, averageRating " +
    "from employers " +
    "where averageRating is not null " +
    "and (address like '%" +
    msg.where +
    "%' " +
    "and companyName like '%" +
    msg.what +
    "%')";
  con.query(query, (err, results) => {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, results);
    }
  });
};
exports.handle_request = handle_request;
