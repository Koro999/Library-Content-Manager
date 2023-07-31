const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//in this model, genre's have 
//id
//genre
//book_id

class Genre extends Model {}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      //genre's should be unique but for dummy data generation it's causing issues
      //unique: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'genre',
  }
);

module.exports = Genre;