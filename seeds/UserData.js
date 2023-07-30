const { faker } = require("@faker-js/faker"); // import faker
const { User } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 10; // Adjust this to the total number of records you want to generate

(async () => {
  await User.sync({ force: true });

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

      //custom insert into db 
      userData.push({
        first_name: "test",
        last_name: "test",
        address: "test",
        phone_number: "111-111-1111",
        email: "test@gmail.com",
        password: "password",
      })
    }

    await User.bulkCreate(bookData); //create records by inserting the book data.

    console.log(
      `Successfully seeded ${TOTAL_RECORDS} records for Genre Model.`
    );
  } catch (error) {
    console.error("Error seeding Genre Model:", error);
  }

  // Close the connection after the operation
  await Genre.sequelize.close();
})();
/*
[
  {
    first_name: "Chris",
    last_name: "Dang",
    address: "123 street",
    phone_number: "435-123-1231",
    email: "chris@gmail.com",
    password: "password",
  }
];
*/