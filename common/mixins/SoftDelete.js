/**
 * Loopback SoftDelete
 *
 * To implement, add "SoftDelete": true in mixins section on YourModel.json file
 *
 * To run queries that include deleted items in the response,
 * add { is_deleted: true } to the query object (at the same level as where, include etc).
 */

module.exports = function (Model, options) {
    Model.defineProperty('deleted_at', {
        type: Date,
        required: false,
        mysql: {
            columnName: "deleted_at",
            dataType: "timestamp",
            dataLength: null,
            dataPrecision: null,
            dataScale: null,
            nullable: "Y"
        }
    });

    /**
     * Watches destroyAll(), deleteAll(), destroyById() , deleteById(), prototype.destroy(), prototype.delete() methods
     * and instead of deleting object, sets properties deletedAt and is_deleted.
     */
    Model.observe('before delete', function (ctx, next) {
        Model.updateAll(ctx.where, {deleted_at: new Date()}).then(function (result) {
            next(null);
        });
    });

    /**
     * When ever model tries to access data, we add by default is_deleted: false to where query
     * if there is already in query is_deleted property, then we do not modify query
     */
    Model.observe('access', function logQuery(ctx, next) {
        if (!ctx.query.deleted_at && (!ctx.query.where || ctx.query.where && JSON.stringify(ctx.query.where).indexOf('deleted_at') == -1)) {
            if (!ctx.query.where) ctx.query.where = {};
            ctx.query.where.deleted_at = null;
        }
        next();
    });
};
