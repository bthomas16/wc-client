
exports.up = function(knex, Promise) {
    return knex.schema.createTable('watch', (table) => {
        table.increments('id').primary();
        table.integer('collection_id').references('id').inTable('collection');
        table.string('src')
        table.string('name')
        table.integer('acquiredFor')
        table.boolean('isForSale')
        table.boolean('isForTrade')
        table.integer('lowestOfferAccepting');
        table.integer('sizeWidth')
        table.integer('sizeHeight')
        table.integer('sizeLugToLug')
        table.string('movementType')
        table.integer('value')
        table.integer('yearOfManufacture');
        table.string('brand');
        table.string('ref');
        table.string('model');
        table.integer('forSalePrice');
        table.integer('forTradeValue');
        table.string('accuracy');
        table.string('crystal');
        table.string('movement');
        table.string('condition');
        table.boolean('isFullKit');
        table.string('dateAcquired');
        table.boolean('isLimitedEdition');
        table.integer('limitedEditionNumber');
        table.integer('limitedEditionTotal');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('watch')
  };