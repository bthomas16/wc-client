const knex = require('../config/db');

const Watch = (function() {

    function validateWatchFormData(formData, res) {
        console.log('ok Ill validate it', formData)
        if(!formData)  res.json({isSuccess: false, message: 'Please send a valid form'});
        // else if (!formData.src)  res.json({isSuccess: false, message: 'Please provide at least one image of the watch in your posession'});
        else if (!formData.name)  res.json({isSuccess: false, message: 'Please provide a watch name'});
        // else if (!formData.acquiredFor)  res.json({isSuccess: false, message: 'Please provide a price you acquired the watch for'});
        // else if (!formData.isForSale)  res.json({isSuccess: false, message: 'Please let users know if the watch is for sale or not'});
        // else if (!formData.isForTrade)  res.json({isSuccess: false, message: 'Please let users know if the watch is for trade'});
        // else if (!formData.sizeWidth)  res.json({isSuccess: false, message: 'Please provide a width in mm for the case (without crown)'});
        // else if (!formData.sizeWidth)  res.json({isSuccess: false, message: 'Please provide a height in mm for the case (without crown)'});
        // else if (!formData.value)  res.json({isSuccess: false, message: 'Please provide a value for this watch'});
        // else if (!formData.movementType)  res.json({isSuccess: false, message: 'Please specify a movement type for this watch'});
        // else if (!formData.sizeLugToLug)  res.json({isSuccess: false, message: 'Please provide a width in mm for the lug to lug measurement (band placement)'});
        // else if (!formData.condition)  res.json({isSuccess: false, message: "Please provide an accurate condition describing the watch's overall condition"});
        // else if (!formData.isFullKit)  res.json({isSuccess: false, message: 'Please let users know if the watch is a full kit'});
        else {
            console.log('it worked')
            return true
            }
        }

    async function saveWatchToCollectionDB(formData, user_id, res) {
        try 
        {
            console.log('hopefully saving watch to db', formData, user_id);
            await knex('watch').returning('*').insert(
                {
                    // src: formData.src,
                    name: formData.name,
                    acquiredFor: formData.acquiredFor,
                    isForSale: formData.isForSale,
                    isForTrade: formData.isForTrade,
                    sizeWidth: formData.sizeWidth,
                    sizeHeight: formData.sizeHeight,
                    sizeLugToLug: formData.sizeLugToLug,
                    value: formData.value,
                    movementType: formData.movementType,
                    condition: formData.condition,
                    isFullKit: formData.isFullKit,
                    user_id: user_id,
                    order: formData.order
                }).then((watch) => {
                    console.log('saved!', watch)
                    res.json({
                        isSuccess: true,
                        message: 'Watch saved to Collection',
                        watch: watch[0]
                    });
                }
            ) 
        }
        catch 
        {
            res.json({isSuccess: false, message: 'Could not save watch to Collection at this time'})
        }
        
    }



    return { 
        validateWatchFormData,
        saveWatchToCollectionDB
            
    }
})()



module.exports = Watch;  