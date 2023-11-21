const { state, resume } = require("../../sqldbConfig.js");
const con = require("../../sqldbConfig.js");

const handle_request = async (msg, callback) => {
    try {
        let sqlSelect = `INSERT INTO jobs ( companyId, jobTitle, country, isRemote, inInPerson, type, streetAddress, city, state, zip, fulldescription, salaryDetails, compensation, whatYouWillDo, whatYouWillNeed, whatYouWillLoveWorkingFor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
      con.query(sqlSelect, [msg.userId, msg.jobTitle, msg.country, msg.isRemote,msg.inInPerson, msg.jobType, msg.streetAddress,msg.city,msg.state,msg.zipCode,msg.jobDescription, msg.salaryDetails,msg.compensation, msg.whatYouWillDo,msg.whatYouWillNeed,msg.whatYouWillLoveWorkingFor], (err, result) => {
          if (result) {
            console.log("job post result *******************")
          callback(null, {
            result
          });
        } else throw err;
      });
    } catch (exception) {
      callback({ message: exception }, null);
    }
  };
  exports.handle_request = handle_request;