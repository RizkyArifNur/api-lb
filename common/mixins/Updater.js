/**
 * Loopback Updater
 *
 * To implement, add "Updater": true in mixins section on YourModel.json file
 */

'use strict';

module.exports = function (Model, options) {

    Model.defineProperty('created_at', {
        type: Date,
        required: false,
        mysql: {
            columnName: "created_at",
            dataType: "timestamp",
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: "Y"
        }
    });

    Model.defineProperty('updated_at', {
        type: Date,
        required: false,
        mysql: {
            columnName: "updated_at",
            dataType: "timestamp",
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: "Y"
        }
    });

    Model.observe('before save', function (ctx, next) {
        console.log(ctx)
        if(ctx.isNewInstance) {
            ctx.instance.created_at = new Date();
        } else {
            ctx.data.updated_at = new Date();
        }
        
        next()
    });
};
