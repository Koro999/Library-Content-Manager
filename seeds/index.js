const sequelize = require('../config/connection');
//const { Book, Genre, Loan, User } = require("../models");
const seedUserData = require("./UserData");
const seedLoanData = require("./LoanData");
const seedBookData = require("./BookData");
const seedGenreData = require("./GenreData");


//seed using dummy data (faker)
async function seedDatabase() {
  try {
    //await sequelize.sync({ force: true });
    // Import and execute the seeding logic for each table
    // this seed order matters 
    await seedUserData();
    await seedLoanData();
    await seedBookData();
    await seedGenreData();

    console.log('\x1b[32m', "Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(0);
  }
};

seedDatabase();
