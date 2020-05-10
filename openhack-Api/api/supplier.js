const db_utlity = require("../db-utility");
const db_constants = require("../constants")
/**
 * POST /
 * GetSupplierInfoBySupplierId.
 */
exports.GetSupplierInfoBySupplierId = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["SUPPLIER-INFO"]);
    let supplierId = req.body.supplierId;
    console.log(supplierId);
    let selector = {}
    if (supplierId) {
        selector['supplierId'] = supplierId;
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
 * SaveSupplierItemInfo.
 */
exports.SaveSupplierItemInfo = (req, res) => {

    let db = db_utlity.getDbInstance(db_constants["SUPPLIER-INFO"]);
    let itemInfo = req.body;    
    db.insert(itemInfo, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'insert failed');
            res.json(err);
        } else {
            res.json({ _id: result.id, _revId: result.rev, statusCode: 201 });
        }
    });

};