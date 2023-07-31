const { faker } = require("@faker-js/faker"); // import faker
const { Genre } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 20; // Adjust this to the total number of records you want to generate

async function seedGenreData(){
  await Genre.sync({ force: true });
  
  try {
    const genreData = []; //create variable object to send into db
    for (let i = 0; i < TOTAL_RECORDS; i++) { //loop through the amount of records you want to create 
      genreData.push({
        //genre
        genre: faker.lorem.words({max: 3}),
      });
    }

    await Genre.bulkCreate(genreData); //create records by inserting the book data. 

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for Genre Model.`);
  } catch (error) {
    console.error("Error seeding Genre Model:", error);
  }
};

module.exports = seedGenreData;