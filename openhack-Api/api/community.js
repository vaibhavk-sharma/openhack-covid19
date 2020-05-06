const db_utlity = require("../db-utility");
const db_constants = require("../constants")
/**
 * POST /
 * FindUserbyEmailId.
 */
exports.FilterBySearchTerm = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["COMMUNITY"]);
    let searchTerm = req.body.searchTerm;
    let selector = {}
    if (searchTerm) {
        selector['$or'] = [
            {
                "name": {
                   "$regex": "(?i)" + searchTerm
                }
             },
             {
                "address": {
                   "pinCode": searchTerm
                }
             }
        ];
    };

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
 * FindUserbyEmailId.
 */
exports.RegisterCommunity = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["COMMUNITY"]);

    let community = req.body.community;
    console.log(community);
    db.insert(community, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'insert failed');
            res.json(err);
        } else {
            res.json({ _id: result.id, _revId: result.rev, statusCode: 201 });
        }
    });
};