const dbconn = require("../mysqlConnection");

function handle_request(msg, callback) {
  console.log("Update Request : ", msg);

  const querry =
    "UPDATE indeed.employers SET employerName = ?, role = ? ,address = ?, website = ?, companyType = ?, companySize = ?, revenue = ?, headquarters =?, industry = ?, founded = ?, missionAndVision = ?,ceoName = ?  WHERE email = ?";
  dbconn.query(
    querry,
    [
      msg.name,
      msg.role,
      msg.address,
      msg.website,
      msg.companyType,
      msg.size,
      msg.revenue,
      msg.headquarters,
      msg.industry,
      msg.founded,
      msg.mission,
      msg.ceoName,
      msg.emp_id,
    ],
    (err, res) => {
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
    }
  );
}

exports.handle_request = handle_request;
