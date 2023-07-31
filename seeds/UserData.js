const { faker } = require("@faker-js/faker"); // import faker
const { User } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 9; // Adjust this to the total number of records you want to generate

async function seedUserData() {
  await User.sync({ force: true });
  //console.log('1')
  try {
    const userData = []; //create variable object to send into db
    for (let i = 0; i < TOTAL_RECORDS; i++) {
      //loop through the amount of records you want to create
      userData.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
      //console.log('2')
      //custom insert into db 
      userData.push({
        first_name: "test",
        last_name: "test",
        address: "test",
        phone_number: "111-111-1111",
        email: "test@gmail.com",
        password: "password",
      })
      //console.log('3')
    await User.bulkCreate(userData); //create records by inserting the book data.

    console.log( `Successfully seeded ${TOTAL_RECORDS + 1} records for User Model.`);
  } catch (error) {
    console.error("Error seeding User Model:", error);
  }
};

module.exports = seedUserData;