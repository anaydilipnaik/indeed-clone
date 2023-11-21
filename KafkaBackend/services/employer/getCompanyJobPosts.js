const { state, resume } = require("../../sqldbConfig.js");
const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  let skip, limit;
  
  try {
    limit = parseInt(msg.take);
    skip = parseInt(msg.skip);
    console.log("skiiiiiiiiip, ", skip, "...........", limit, "id", msg.id);
      let sqlSelect = `SELECT  * FROM jobs where companyId = ? LIMIT ${limit} OFFSET ${skip}`;
      con.query(sqlSelect, [msg.id], (err, result) => {
        if (result) {
          callback(null, result);
        } else throw err;
      });
    } catch (exception) {
      callback({ message: exception }, null);
    }
  };
  exports.handle_request = handle_request;