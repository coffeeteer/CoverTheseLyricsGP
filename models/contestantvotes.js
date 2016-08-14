'use strict';
module.exports = function(sequelize, DataTypes) {
  var contestantVotes = sequelize.define('contestantVotes', {
    good / bad: DataTypes.BOOLEAN,
    userId: DataTypes.INT,
    summissionId: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contestantVotes;
};