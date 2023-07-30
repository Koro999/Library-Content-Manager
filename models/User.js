//import necessary files and libraries
const { UUIDV4, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//in this model, users's have 
//id
//first name
//last name
//card id number
//address
//email
//password


class User extends Model {
  //function to check if passwords match
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    card_id: {
      type: DataTypes.INTEGER,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },    
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;

//model good!