const { faker } = require("@faker-js/faker");
const { Book } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 100; // Adjust this to the total number of records you want to generate

(async () => {
  await Book.sync({ force: true });
  //title
  //author
  //isbn
  //pages
  //publisher
  //copies
  try {
    const bookData = [];
    for (let i = 0; i < TOTAL_RECORDS; i++) {
      Book.push({
        title: faker.lorem.words({ min: 1, max: 3 }),
        author: `${faker.person.firstName()}  ${faker.person.lastName()}`,
        //	xxx-x-xx-xxxxxx-x example format 
        isbn: `${faker.string.numeric(3)}-${faker.string.numeric()}-${faker.string.numeric(2)}-${faker.string.numeric(6)}-${faker.string.numeric()}`,
        pages: faker.number.int({ max: 500 }),
        publisher: faker.company.name(),
        copies: faker.number.int({ max: 5 }),
        // Add other fields as needed for YourModel1
      });
    }

    await Book.bulkCreate(bookData);

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for Book Model.`);
  } catch (error) {
    console.error("Error seeding Book Model:", error);
  }

  // Close the connection after the operation
  await YourModel1.sequelize.close();
})();
