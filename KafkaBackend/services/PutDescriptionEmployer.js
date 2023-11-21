const dbconn = require("../mysqlConnection");

function handle_request(msg, callback) {
  console.log("Update Request : ", msg);

  const querry =
    "UPDATE indeed.employers SET whyJoinUs = ?, desc = ? WHERE email = ?";
  dbconn.query(querry, [msg.whyJoinUs, msg.desc, msg.emp_id], (err, res) => {
    // console.log(res, err, req);
    console.log(querry);
    const data_response = res;
    console.log("Data Response : ", data_response);
    if (data_response) {
      console.log("Updated Successfully!!!");
      callback(null, res);
      //response.status(200).send(data_response);
    } else {
      callback(err, null);
    }
  });
}

exports.handle_request = handle_request;
