const db_utlity = require("../db-utility");
const db_constants = require("../constants");

// Getting all the supplier details belonging to the user community
exports.GetSupplier = (req,res) => {
    console.log("1.GetsupplierForCommunity");
    let db = db_utlity.getDbInstance(db_constants["RESIDENTDB-USERS"]);
    let communityId=req.body.communityId;
    let selector = {
        "$and":[
            {
                "type":"Supplier"
            },
            {
                "isUserVerified":true
            },
            {
                "communityId":{
                    "$elemMatch":{
                        "$eq":communityId
                    }
                }
            }
        ]
    };
    db.find({ selector }, (err, documents) => {
        if (err) {
            res.json(err);
        } else {
            console.log(documents.docs[0]);
            res.json(documents.docs);
        }
    });
};

// Getting all the items supplied by that supplier
exports.GetSupplierItems = (req,res) => {
    let db = db_utlity.getDbInstance(db_constants["SUPPLIERINFODB"]);
    let supplierId=req.body.supplierId;
    console.log('1',supplierId)
    let selector = {};
    if (supplierId) {
        selector['supplierId'] = supplierId;
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

// Select the item to create an order
exports.CreateOrder = (req,res) => {
    let db = db_utlity.getDbInstance(db_constants["ORDERDB"]);
    
    let order =  {
        items:req.body.items,        
        status:'initiated',
        residentId:req.body.residentId,
        supplierId:req.body.supplierId,
        totalBill:0
    };
    console.log('2',supplierId)
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


