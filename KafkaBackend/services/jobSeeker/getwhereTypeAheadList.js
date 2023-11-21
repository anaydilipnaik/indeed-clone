const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  try {
    let finalResult = [];

    let sqlSelect = `SELECT distinct city FROM jobs where city like  '%${msg.where}%'`;

    con.query(sqlSelect, [], (err, result) => {
      if (result.length > 0) {
        finalResult.push(
          ...result.map((row) => {
            return row.city;
          })
        );
        if (finalResult) {
          callback(null, finalResult);
        }
      } else throw err;
    });
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
