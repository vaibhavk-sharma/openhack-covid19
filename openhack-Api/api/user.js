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
        selector['isAdmin'] = false
        selector['communityId'] = communityId
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
