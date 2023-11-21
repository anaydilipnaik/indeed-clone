const pool = require("../queryBuilder");

function handle_request(msg, callback) {
  let savedjobid = msg.savedjobid;
  delete msg.savedjobid;
  pool.get_connection((qb) => {
    qb.update("savedjobs", msg, { id: savedjobid }, (err, results) => {
      if (err) callback(err, "Error");
      else callback(null, "Success");
    });
  });
}

exports.handle_request = handle_request;
