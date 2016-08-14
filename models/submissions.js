'use strict';
module.exports = function(sequelize, DataTypes) {
  var Submissions = sequelize.define('Submissions', {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    entry: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INT,
    parental: DataTypes.BOOLEAN,
    lyrics: DataTypes.STRING,
    heardAboutUs: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Submissions;
};