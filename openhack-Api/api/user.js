const db_utlity = require("../db-utility");
const db_constants = require("../constants")
/**
 * POST /
 * FindUserbyEmailId.
 */
exports.FindUserbyEmailId = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let emailId = req.body.emailId;
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
            console.log(documents.docs[0]);
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
    db.insert(user, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'insert failed');
            res.json(err);
        } else {
            res.json({ _id: result.id, _revId: result.rev, statusCode: 201 });
        }
    });
};
