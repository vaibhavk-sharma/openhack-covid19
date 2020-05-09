const db_utlity = require("../db-utility");
const db_constants = require("../constants");

/**
 * Create a resource with the specified attributes
 * @param communityID - the communityID of the user to ehich it belongs
 * @param {String} title - the title of the post
 * @param {String} description - the description of the post
 *
 */
exports.CreatePost = (req,res) => {
    console.log("Idhar aaya", req.body);
    let db = db_utlity.getDbInstance(db_constants["FORUMDB"]);
   
    let whenCreated = Date.now();
        let post = {
            communityId:req.body.communityId,
            title: req.body.title,
            content: req.body.content,
            whenCreated:whenCreated
        };
        db.insert(post, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'insert failed');
                res.json(err);
            } else {
                console.log('Result', result);
                res.json({ result: result, statusCode: 201 });
            }
        });
};

exports.ViewAllPost = (req,res) => {
    let db = db_utlity.getDbInstance(db_constants["FORUMDB"]);
    let communityId = req.body.communityId;
    let selector = {}
    if (communityId) {
        selector['communityId'] = communityId;
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

exports.DeletePostByAdmin = ((req,res) => {
    let db = db_utlity.getDbInstance(db_constants["FORUMDB"]);;
    let contentId = req.body.contentId;
    let latestrev = req.body.latestrev;

    console.log(JSON.stringify(req.body), contentId,latestrev);
    db.destroy(contentId,latestrev, function(err, body, header) {
        if (err) {
            console.log('Error occurred: ' + err.message, 'delete failed');
            res.json(err);
        } else {
            console.log("Deleted post")
            res.json({ statusCode: 202 });
        }
      });
    

})
