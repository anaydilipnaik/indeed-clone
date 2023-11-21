const { state, resume } = require("../../sqldbConfig.js");
const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
  let skip, limit;

  try {
    limit = parseInt(msg.take);
    skip = parseInt(msg.skip);
    let sqlSelect1;
    let sqlSelect2;
    let companyId;
    let arrayValue = [];

    if (msg.companyId) {
      if (msg.what.length > 0 && msg.where.length > 0) {
        sqlSelect1 = `SELECT  e.companyName, e.website, e.averageRating ,e.totalReviews,e.address, j.* FROM jobs j , employers e where j.companyId= ? and j.jobTitle = ?  and j.city = ? LIMIT ${limit} OFFSET ${skip}`;

        con.query(
          sqlSelect1,
          [msg.companyId, msg.what, msg.where],
          (err, result1) => {
            if (result1) {
              callback(null, result1);
            } else throw err;
          }
        );
      } else if (msg.what.length > 0) {
        sqlSelect1 = `SELECT  e.companyName, e.website, e.averageRating ,e.totalReviews,e.address, j.* FROM jobs j , employers e where j.companyId= ? and j.jobTitle = ? LIMIT ${limit} OFFSET ${skip}`;

        con.query(sqlSelect1, [msg.companyId, msg.what], (err, result1) => {
          if (result1) {
            callback(null, result1);
          } else throw err;
        });
      } else if (msg.where.length > 0) {
        sqlSelect1 = `SELECT  e.companyName, e.website, e.averageRating, e.totalReviews ,e.address, j.*  FROM jobs j , employers e where  j.companyId= e.id and j.companyId = ? and j.city = ? LIMIT ${limit} OFFSET ${skip}`;

        con.query(sqlSelect1, [msg.companyId, msg.where], (err, result1) => {
          if (result1) {
            callback(null, result1);
          } else throw err;
        });
      } else {
        sqlSelect1 = `SELECT  e.companyName, e.website, e.averageRating, e.totalReviews ,e.address, j.*  FROM jobs j , employers e where  j.companyId= e.id and j.companyId = ? LIMIT ${limit} OFFSET ${skip}`;

        con.query(sqlSelect1, [msg.companyId], (err, result1) => {
          if (result1) {
            callback(null, result1);
          } else throw err;
        });
      }
    } else {
      if (msg.what.length > 0) {
        sqlSelect1 = `SELECT  id FROM employers where companyName  = ?`;

        con.query(sqlSelect1, [msg.what], (err, result1) => {
          if (result1.length > 0) {
            companyId = result1[0].id;
            arrayValue.push(companyId);
            sqlSelect2 = `SELECT  e.companyName, e.website, e.averageRating, e.totalReviews ,e.address, j.*  FROM jobs j , employers e where  j.companyId= e.id and j.companyId = ? LIMIT ${limit} OFFSET ${skip}`;
            if (msg.where.length > 0) {
              sqlSelect2 = `SELECT  e.companyName, e.website, e.averageRating, e.totalReviews ,e.address, j.*  FROM jobs j , employers e where  j.companyId= e.id and j.companyId = ? and j.city = ? LIMIT ${limit} OFFSET ${skip}`;

              arrayValue.push(msg.where);
            }
            con.query(sqlSelect2, arrayValue, (err, result2) => {
              if (result2) {
                callback(null, result2);
              } else throw err;
            });
          } else {
            sqlSelect2 = `SELECT  e.companyName, e.website, e.averageRating ,e.totalReviews,e.address, j.* FROM jobs j , employers e where j.companyId= e.id and j.jobTitle = ? LIMIT ${limit} OFFSET ${skip}`;
            arrayValue.push(msg.what);
            if (msg.where.length > 0) {
              sqlSelect2 = `SELECT  e.companyName, e.website, e.averageRating ,e.totalReviews,e.address, j.* FROM jobs j , employers e where j.companyId= e.id and j.jobTitle = ? and j.city = ? LIMIT ${limit} OFFSET ${skip}`;
              arrayValue.push(msg.where);
            }
            con.query(sqlSelect2, arrayValue, (err, result2) => {
              if (result2) {
                callback(null, result2);
              } else throw err;
            });
          }
        });
      } else if (msg.where.length > 0) {
        sqlSelect2 = `SELECT  e.companyName, e.website, e.averageRating, e.totalReviews ,e.address, j.*  FROM jobs j , employers e where  j.companyId= e.id and j.city = ? LIMIT ${limit} OFFSET ${skip}`;

        con.query(sqlSelect2, [msg.where], (err, result2) => {
          if (result2) {
            callback(null, result2);
          } else throw err;
        });
      }
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
