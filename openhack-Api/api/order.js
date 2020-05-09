const db_utlity = require("../db-utility");
const db_constants = require("../constants");

/** Add attachment to the existing order */
exports.addAttachement = (req, res) => {
    /**@param: documentId, documentRev, attachmentName (PaymentReceipt/SupplierFinalBill), 
     * data - attachement content/data as base64 string, contentType
     *  under req.body */

    /**
     {
       "documentId":"09111924cd6492d8cd7783138a716b7b",
       "documentRev":"8-a95060b5ad279877358035b9281d0e21",
       "attachmentName":"PaymentReceipt",
       "data":"md5-uZ4eaHUG7BBW8gAjVCD0CA==",
       "contentType":"image/png"
       }
     */

    let attachment = {
        documentId: req.body.documentId, documentRev: req.body.documentRev,
        Name: req.body.attachmentName, data: req.body.data, contentType: req.body.contentType
    };

    // Mock
    // attachment = {
    //     documentId: "09111924cd6492d8cd7783138a716b7b", documentRev: "5-e09fbf01ed3b855479b66e8e6bebe8f5",
    //     Name: "PaymentReceipt", data: "md5-uZ4eaHUG7BBW8gAjVCD0CA==", contentType: "image/png"
    // };

    if (attachment.documentId && attachment.Name && attachment.data && attachment.contentType) {
        let db = db_utlity.getDbInstance(db_constants["ORDERS"]);
        db.attachment.insert(attachment.documentId, attachment.Name, attachment.data, attachment.contentType,
            { rev: attachment.documentRev }).then((body) => {
                res.json(body);
            }).catch((err) => {
                console.log(err);
                res.json("Database error!");
            });
    }
    else {
        res.json("Required parameters are missing in the request!")
    }
};

exports.getAttachment = (req, res) => {
    /**@param: residentId (required), supplierId - optional, status -optional under the req.body */
    /**
    {
        "documentId":"09111924cd6492d8cd7783138a716b7b",
        "attachmentName":"PaymentReceipt"
    }
     */

    let documentId = req.body.documentId;
    let attachmentName = req.body.attachmentName;

    // // Mock
    // documentId = "09111924cd6492d8cd7783138a716b7b";
    // attachmentName = "PaymentReceipt";

    if (documentId && attachmentName) {
        let db = db_utlity.getDbInstance(db_constants["ORDERS"]);

        db.attachment.get(documentId, attachmentName).then((body) => {
            res.json(body.toString('base64'));
        }).catch((err) => {
            console.log(err);
            res.json("Attachment not found!");
        });
    }
    else {
        res.json("Required parameters are missing in the request!");
    }
};

/**
  * Fetch order by resident id
 */
exports.getOrders = (req, res) => {
    /**@param: residentId or supplierId at least one, status -optional under the req.body */
    /** 
    {
        "residentId":"11e256395e9a14982b01cd1d5b24849d",
        "supplierId":""
      }
    */

    let residentId = req.body.residentId;
    let supplierId = req.body.supplierId;
    let status = req.body.status;
    let selector = {};

    // Mock 
    // residentId = "11e256395e9a14982b01cd1d5b24849d";

    if (residentId || supplierId) {
        let db = db_utlity.getDbInstance(db_constants["ORDERS"]);

        selector['residentId'] = residentId;
        selector['supplierId'] = supplierId;

        if (status) {
            selector['status'] = status;
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
    }
    else {
        res.json("Required parameters are missing in the request!");
    }
};

