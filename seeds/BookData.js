const { faker } = require("@faker-js/faker"); // import faker
const { Book, Loan} = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 100; // Adjust this to the total number of records you want to generate
let idArray = [];//empty array meant to hold id data 

//extract all information from the Loan database, to grab ids
(async () => {
  await Book.sync({ force: true });
  
  try {
    const loanData = await Loan.findAll();
    idArray = loanData.map((loanData) => loanData.id);

    console.log('idArray', idArray);

    const bookData = []; //create variable object to send into db
    for (let i = 0; i < TOTAL_RECORDS; i++) { //loop through the amount of records you want to create 
      bookData.push({
        title: faker.lorem.words({ min: 1, max: 3 }),
        author: faker.person.fullName(),
        //	xxx-x-xx-xxxxxx-x example format 
        isbn: `${faker.string.numeric(3)}-${faker.string.numeric()}-${faker.string.numeric(2)}-${faker.string.numeric(6)}-${faker.string.numeric()}`,
        pages: faker.number.int({ max: 500 }),
        publisher: faker.company.name(),
        copies: faker.number.int({ max: 5 }),
        //pick random loan to assign books to
        loan_id: idArray[Math.floor(Math.random() * idArray.length)] 
      });
    }

    await Book.bulkCreate(bookData); //create records by inserting the book data. 

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for Book Model.`);
  } catch (error) {
    console.error("Error seeding Book Model:", error);
  }

  // Close the connection after the operation
  await Book.sequelize.close();
});
