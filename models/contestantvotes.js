'use strict';
module.exports = function(sequelize, DataTypes) {
  var contestantVotes = sequelize.define('contestantVotes', {
    ip: DataTypes.STRING,
    vote_count: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contestantVotes;
};