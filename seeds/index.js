const sequelize = require('../config/connection');
const { Book, Genre, Loan, User } = require("../models");
const seedUserData = require("./UserData");
    //await require("./GenreData");
    //await require("./BookData");
    //await require("./LoanData");

//seed using dummy data (faker)
async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    // Import and execute the seeding logic for each table
    // this seed order matters 
    console.log('aaaaa\n')
    await seedUserData();

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(0);
  }
};

seedDatabase();
