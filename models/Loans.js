const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//in this model, Loans have 
//id
//checkout_date
//due date
//reader_id

class Loans extends Model {}

Loans.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    checkout_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('DATE_ADD(NOW(), INTERVAL 2 WEEK)'),
    },
    card_number: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'loans',
  }
);

module.exports = Loans;