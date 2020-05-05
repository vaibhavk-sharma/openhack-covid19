var Cloudant = require('@cloudant/cloudant');
const cloudantServiceUrl = 'https://f9cebdcb-7640-4598-adca-dd505ec06ebe-bluemix.cloudantnosqldb.appdomain.cloud/';

var cloudant = Cloudant({url: cloudantServiceUrl,plugins:{iamAuth:{iamApiKey:'ZEOiHcs9UGglu99D5JSH8KTbi0ttfiLK8hHyIxCNusM-'}} });

function getDbs(){
cloudant.db.list((err, body)=>{
    body.forEach((db) => {
        console.log('here is db');
        console.log(db);
    });
})
}

module.exports.getDbs = getDbs;