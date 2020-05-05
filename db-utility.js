var Cloudant = require('@cloudant/cloudant');
const cloudantServiceUrl = 'https://f9cebdcb-7640-4598-adca-dd505ec06ebe-bluemix.cloudantnosqldb.appdomain.cloud/';

var cloudant = Cloudant({url: cloudantServiceUrl,plugins:{iamauth:{iamApiKey:'ZEOiHcs9UGglu99D5JSH8KTbi0ttfiLK8hHyIxCNusM-'}} });

function getDbs(){
//let dbListArray = [];

return new Promise((resolve, reject)=>{

      
    cloudant.db.list((err, body)=>{
        let dbNames = '';
        body.forEach((db) => {        
            console.log(db);
            let seperator = dbNames? dbNames + ', ' : '';
            dbNames = dbNames + seperator + db;
        });
        resolve({data:dbNames});
    })

})


//return dbListArray;
}

module.exports.getDbs = getDbs;