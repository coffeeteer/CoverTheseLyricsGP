'use strict';
module.exports = function(sequelize, DataTypes) {
  var contestantVotes = sequelize.define('contestantVotes', {
    ip: DataTypes.STRING,
    vote_counts: DataTypes.INTEGER,
    entry_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contestantVotes;
};