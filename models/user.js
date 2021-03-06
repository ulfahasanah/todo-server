'use strict';
const hashPassword = require('../helper/hashPassword');

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "Password has at least 6 characters"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        const hashPass = hashPassword.hashPassword(instance.password)
        instance.password = hashPass
      }
    },
    modelName: 'User'
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};