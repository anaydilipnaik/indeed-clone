const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let sqlSelect1 = `SELECT  * FROM jobseekers where id = ? and email = ?`;

    // checking if email is changed or not

    con.query(sqlSelect1, [msg.id, msg.email], (err, result) => {
      if (result.length === 1) {
        let currentValues = result[0];
        //other values like name and phoneno changed
        let sqlUpdate1 = `UPDATE jobseekers SET  lastName = ?, firstName= ?, phoneNo =? where  id = ? `;

        con.query(
          sqlUpdate1,
          [
            msg.lastName ? msg.lastName : result[0].lastName,
            msg.firstName ? msg.firstName : result[0].firstName,
            msg.phoneNo ? msg.phoneNo : result[0].phoneNo,
            msg.id,
          ],
          (err, result1) => {
            if (result1) {
              callback(null, { message: "Profile Updated" });
            } else throw err;
          }
        );
      } else {
        //check if incoming new email id exists already
        let sqlSelect2 = `SELECT  * FROM jobseekers where  email = ? and id != ?`;

        con.query(sqlSelect2, [msg.email, msg.id], (err, result3) => {
          if (result3.length === 1) {
            //new email coming in already exists
            callback(null, {
              message: "New Email Id already exists, update a unique email id",
            });
          } else {
            //if not update email also, email not found update new email
            let currentValues = result3[0];

            let sqlUpdate2 = `UPDATE jobseekers SET  lastName = ?, firstName= ?, phoneNo =? , email = ? where  id = ? `;

            con.query(
              sqlUpdate2,
              [
                msg.lastName ? msg.lastName : currentValues.lastName,
                msg.firstName ? msg.firstName : currentValues.firstName,
                msg.phoneNo ? msg.phoneNo : currentValues.phoneNo,
                msg.email ? msg.email : currentValues.email,
                msg.id,
              ],
              (err, result4) => {
                if (result4) {
                  callback(null, { message: "Profile Updated" });
                } else throw err;
              }
            );
          }
        });
      }
    });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
