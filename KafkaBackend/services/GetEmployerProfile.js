const dbconn = require("../mysqlConnection");

function handle_request(msg, callback) {
  console.log("Request ID: ", msg);

  const querry = "SELECT * FROM indeed.employers WHERE email = ?";
  dbconn.query(querry, [msg.emp_id], (err, res) => {
    // console.log(res, err, req);
    const data_response = res;
    console.log(data_response);
    if (data_response) {
      callback(null, res);
      //response.status(200).send(data_response);
    } else {
      callback(err, null);
    }
  });
}

exports.handle_request = handle_request;
