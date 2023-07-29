// JUNCTION TABLE
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BookGenre extends Model {}
BookGenre.init(
  {
    // Attributes for the Enrollment model (foreign keys)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'genre',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'book_genre',
    timestamps: false,
  }
);

// Export the Enrollment model
module.exports = BookGenre;