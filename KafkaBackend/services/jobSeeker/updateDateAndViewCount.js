const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    var d = new Date();
    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    console.log("date --------", today);

    let sqlSELECT = `SELECT * from employers where id = ? and dateVisited = ? `;

    con.query(sqlSELECT, [msg.companyid, today], (err, result) => {
      if (result) {
        if (result.length > 0) {
          console.log("data was here");

          let dailyViewCount = result[0].dailyViews;

          let updateSQL = `UPDATE employers SET dailyViews = ? where id= ?`;
          if (msg.companyid) {
            console.log("companyId", msg.companyid);
            con.query(
              updateSQL,
              [dailyViewCount + 1, msg.companyid],
              (err, result) => {
                if (result) {
                  console.log("exec");
                  callback(null, { message: "Count updated" });
                }
              }
            );
          } else throw err;
        } else {
          let updateSQL = `UPDATE employers SET dateVisited = ? , dailyViews = ? where id= ?`;
          if (msg.companyid) {
            console.log("companyId", msg.companyid);
            con.query(updateSQL, [today, 1, msg.companyid], (err, result) => {
              if (result) {
                console.log("exec");
                callback(null, { message: "Daily count initialized" });
              }
            });
          } else throw err;
        }
      }
    });

    // 2021-12-03T18:09:49.773Z

    // SELECT DATE_FORMAT(dateVisited, '%m/%d/%Y %H:%i') FROM employers;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
