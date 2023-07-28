const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull:false,
      unique: true
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Publisher: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Copies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'card',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;