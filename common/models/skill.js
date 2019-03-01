'use strict';

module.exports = function(Skill) {

    Skill.createOrUpdate = function(req , res, options, callback) {
        var inputData = {
            people_id:956705237047,
            skill:"Ngoding"
        };

        const data = Skill.create(inputData);
        
        data
        .then(function(result){
            callback("", 200, "successfully", result);
        })
        .catch(function(err){
            callback(err, 500, "failed", "");
        })
    };
    
};