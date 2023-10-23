const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
    },
    pass: {
      type: DataTypes.CHAR,
    },
    email: {
      type: DataTypes.CHAR,
    },
  }, {
    timestamps: false,
  });
};