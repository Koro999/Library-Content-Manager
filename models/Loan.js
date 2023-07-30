const { UUIDV4, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//in this model, Loans have
//id
//checkout_date
//due date
//reader_id

class Loan extends Model {}

Loan.init(
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
      defaultValue: DataTypes.NOW,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      //this should show a date 2 weeks from creation
      defaultValue: function () {
        // Calculate two weeks from now
        const twoWeeksFromNow = new Date();
        twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
        return twoWeeksFromNow;
      },
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "card_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "loan",
  }
);

module.exports = Loan;
