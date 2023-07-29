const { faker } = require("@faker-js/faker"); // import faker
const { Genre } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 100; // Adjust this to the total number of records you want to generate

(async () => {
  await Genre.sync({ force: true });
  
  try {
    const genreData = []; //create variable object to send into db
    for (let i = 0; i < TOTAL_RECORDS; i++) { //loop through the amount of records you want to create 
      Genre.push({
        //genre
        genre: faker.lorem.word(),
      });
    }

    await Genre.bulkCreate(bookData); //create records by inserting the book data. 

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for Genre Model.`);
  } catch (error) {
    console.error("Error seeding Genre Model:", error);
  }

  // Close the connection after the operation
  await Genre.sequelize.close();
})();
