const faker = require('faker');
const { YourModel1 } = require('./models'); // Import your Sequelize model here

const TOTAL_RECORDS = 10; // Adjust this to the total number of records you want to generate

(async () => {
  await YourModel1.sync({ force: true });

  try {
    const dataModel1 = [];
    for (let i = 0; i < TOTAL_RECORDS; i++) {
      dataModel1.push({
        field1: faker.name.firstName(),
        field2: faker.date.past(),
        // Add other fields as needed for YourModel1
      });
    }

    await YourModel1.bulkCreate(dataModel1);

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for YourModel1.`);
  } catch (error) {
    console.error('Error seeding YourModel1:', error);
  }

  // Close the connection after the operation
  await YourModel1.sequelize.close();
})();
