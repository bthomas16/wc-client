// const knex = require('../config/db');

// const Collection = (function() {

//     function validateCollectionFormData(collectionName, res) {
//         console.log('checking')
//         if(!collectionName)  res.json({isSuccess: false, message: 'Please send a name for your Watch Collection'});
//         else {
//             console.log('istrue')
//             return true
//             }
//         }

//     async function saveCollectionNameToDB(collectionName, user_id, res) {
//         try 
//         {
//             console.log('hueig', collectionName, user_id);
//             knex.insert
//                 ({
//                     name: collectionName,
//                     user_id: user_id
//                 })
//                 .into('collection').then(() => {
//                     console.log('working and done')
//                     res.json({
//                         isSuccess: true,
//                         message: 'Collection successfully named'
//                     });
//                 }
//             ) 
//         }
//         catch 
//         {
//             res.json({isSuccess: false, message: 'Could not save watch to Collection at this time'})
//         }
        
//     }



//     return { 
//         validateCollectionFormData,
//         saveCollectionNameToDB
            
//     }
// })()



// module.exports = Collection;  