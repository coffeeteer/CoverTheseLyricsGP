'use strict';
module.exports = function(sequelize, DataTypes) {
  var contestantVotes = sequelize.define('contestantVotes', {
    ip: DataTypes.STRING(15),
    vote_counts: DataTypes.INTEGER(3),
    entry_id: DataTypes.INTEGER(3),
    formatted_date: DataTypes.STRING(12)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contestantVotes;
};