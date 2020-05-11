const db_utlity = require("../db-utility");
const db_constants = require("../constants")
/**
 * POST /
 * FindUserbyEmailId.
 */
exports.FindUserbyEmailId = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let emailId = req.body.emailId;
    // console.log(emailId);
    let selector = {}
    if (emailId) {
        selector['email'] = emailId;
    }

    db.find({
        'selector': selector
    }, (err, documents) => {
        if (err) {
            res.json(err);
            
        } else {
            res.json(documents.docs);
        }
    });

};

/**
 * POST /
 * RegisterUser.
 */
exports.RegisterUser = (req, res) => {
    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let user = req.body;
    delete user['newUser']
    db.insert(user, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'insert failed');
            res.json(err);
        } else {
            // console.log("USER INSERTED FROM HERE!!!!!!!!!!!!!!!!!!!!")
            res.json({ _id: result.id, _revId: result.rev, statusCode: 201 });
        }
    });
};

/**
 * POST/ 
 * To get all users present in the db who are not verified
 */
exports.GetAllUsers = (req, res) => {
    let communityId = req.body.communityId;
    let selector = {}
    if(communityId) {
        selector['isAdmin'] = false;
        selector['isUserVerified'] = false;
        selector['$or'] =  [
            {
                "communityId": communityId
             },
             {
                "communityId": {
                    "$elemMatch":{
                        "$eq":communityId
                    }
                }
             }
        ];
    }
    // console.log(communityId)
    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    db.find({
        'selector' : selector
    }, (err, document) => {
        if(err) {
            res.json(err);
        }
        else {
            res.json(document.docs)
        }
    });
};

/**
 * POST/ 
 * To update the isUserVerified field in the database when admin approves the user
 */
exports.UpdateUserAsVerified = (req, res) => {
    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let user = req.body;
    console.log(user);
    //delete user['newUser']
    db.insert(user, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'updation failed');
            res.json(err);
        } else {
            console.log("USER INSERTED FROM HERE!!!!!!!!!!!!!!!!!!!!")
            res.json({ _id: result.id, _revId: result.rev, statusCode: 204 });
        }
    });
};


/**
 * POST/ 
 * To delete the rejected user from the database
 */
exports.DeleteRejectedUser = (req, res) => {
    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let user = req.body;
    console.log(user);
    let docUniqueId = user._id
    let latestRev = user._rev
    //delete user['newUser']
    db.destroy(docUniqueId, latestRev, function(err, body, header) {
        if (err) {
            console.log('Error occurred: ' + err.message, 'delete failed');
            res.json(err);
        } else {
            console.log("USER INSERTED FROM HERE!!!!!!!!!!!!!!!!!!!!")
            res.json({ statusCode: 202 });
        }
      });
};