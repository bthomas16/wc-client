const knex = require('../config/db');


const getWatchCollectionByCondition = (id, conditionToFilterBy) => {
    return knex('watch').where('user_id', id).andWhere(function() {
        this.where('condition', conditionToFilterBy)
        .orWhere('condition', '>', conditionToFilterBy)
    });
}

const getWatchCollectionByStatus = (id, statusToFilterBy) => {
    switch(statusToFilterBy) {
        case 'favorites': // KEEPERS
            return knex.select('*')
                .from('user_watch_favorited')
                .where('user_watch_favorited.isCurrentFavorite', true)
                .andWhere('user_watch_favorited.user_id', req.id)
                .fullOuterJoin('watch', 'user_watch_favorited.user_id', 'watch.user_id')
            break;
        case 'sale':
            return knex('watch')
                .where('user_id', id)
                .andWhere(function() {
                    this.where('isForSale', true)
                    .andWhere('isForTrade', false)
                });
            break;
        case 'trade':
            return knex('watch')
                .where('user_id', id)
                .andWhere(function() {
                    this.where('isForSale', false)
                    .andWhere('isForTrade', true)
                });
            break;
        case 'fsot':
            return knex('watch')
                .where('user_id', id)
                .andWhere(function() {
                    this.where('isForSale', true)
                    .andWhere('isForTrade', true)
                });
            break;
        case 'keeper':
            return knex('watch')
                .where('user_id', id)
                .andWhere(function() {
                    this.where('isForSale', false)
                    .andWhere('isForTrade', false)
                });
            break;
        default:
            return;
    }
}

const getWatchCollectionByStyle = (id, statusTypeInTable, styleToFilterBy) => {
    return knex('watch')
        .where('user_id', id)
        .andWhere('watchStyle', styleToFilterBy);
}

const getWatchCollectionBySearchTerm = (id, searchTerm) => {
    return knex('watch')
        .where('user_id', id)
        .andWhere('name', 'like', '%' + searchTerm + '%');
}

module.exports = {
    getWatchCollectionByCondition,
    getWatchCollectionByStatus,
    getWatchCollectionByStyle,
    getWatchCollectionBySearchTerm
}