// JUNCTION TABLE
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LoanBook extends Model {}
LoanBook.init(
  {
    // Attributes for the Enrollment model (foreign keys)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    loan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'loan',
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'loan_book',
    timestamps: false,
  }
);

// Export the Enrollment model
module.exports = LoanBook;