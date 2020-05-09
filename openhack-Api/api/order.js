const db_utlity = require("../db-utility");
const db_constants = require("../constants");

exports.GetSupplierforCommunity = (req,res) => {
    console.log("1.GetsupplierForCommunity");
    let db = db_utlity.getDbInstance(db_constants["SUPPLIERINFODB"]);
    let communityId=req.body.communityId;
    let selector = {
        "communityId": {
            "$elemMatch": {
               "$eq": communityId
            }
         }
    };
    db.find({ selector }, (err, documents) => {
        if (err) {
            res.json(err);
        } else {
            console.log(documents.docs[0]._id);
            res.json(documents.docs);
        }
    });
};
exports.GetSupplierDetails = (req,res) => {
    let db = db_utlity.getDbInstance(db_constants["SUPPLIERINFODB"]);
    let supplierId=req.body.supplierId;
    let selector = {};
    if (supplierId) {
        selector['_id'] = supplierId;
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
exports.CreateOrder = (req,res) => {
    let db = db_utlity.getDbInstance(db_constants["ORDERDB"]);
    let order =  {
        items:req.body.items,
        quantity : req.body.quantity
    };
    db.insert(order, (err, result) => {
        if (err) {
            console.log('Error occurred: ' + err.message, 'insert failed');
            res.json(err);
        } else {
            console.log('Result', result);
            res.json({ _id: result.id,
                message:"Order placed successfully", statusCode: 201 });
        }
    });
}



