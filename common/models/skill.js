"use strict";

module.exports = function(Skill) {
  Skill.createOrUpdate = function(req, res, options, callback) {
    /**
     * this is an example to get the passed data from the remote hooks method that already created
     * in the mixins,
     * so you can easily passing the accessToken or something else from this property
     * or you can just access the accessToken from
     * req.accessToken
     */
    console.log(req.thePassingData);

    var inputData = {
      people_id: 956705237047,
      skill: "Ngoding"
    };

    const data = Skill.create(inputData);

    data
      .then(function(result) {
        callback("", 200, "successfully", result);
      })
      .catch(function(err) {
        callback(err, 500, "failed", "");
      });
  };
};
