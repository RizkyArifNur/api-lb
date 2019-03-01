/**
 * Loopback Updater
 *
 * To implement, add "Updater": true in mixins section on YourModel.json file
 */

"use strict";

module.exports = function(Model, options) {
  Model.defineProperty("created_at", {
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

  Model.defineProperty("updated_at", {
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

  /**
   * this method will invoked when someone try to access the remote method
   * first params is the name of remote method, asterisk means all remote method of our models,
   * and you can access the @accessToken from this context by accessing the
   * @ctx property
   */
  Model.beforeRemote("*", function(ctx, modelInstance, next) {
    /**
     *
     * you can easily get the userId from thi property
     */
    console.log(ctx.req.accessToken.userId);

    /**
     * you can pass any data from this method to your remote method  through the @ctx,
     * see in your remote method code, i've already write the example there
     */
    ctx.req.thePassingData = "hohoho";

    /**
     * you can access the req property just like you use the express, hihi...
     */
    console.log(ctx.req.params);
    console.log(ctx.req.query);

    next();
  });

  Model.observe("before save", function(ctx, next) {
    if (ctx.isNewInstance) {
      ctx.instance.created_at = new Date();
    } else {
      ctx.data.updated_at = new Date();
    }

    next();
  });
};
