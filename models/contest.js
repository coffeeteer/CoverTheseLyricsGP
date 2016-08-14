'use strict';
module.exports = function(sequelize, DataTypes) {
  var contest = sequelize.define('contest', {
    endDate: DataTypes.STRING,
    winner: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contest;
};