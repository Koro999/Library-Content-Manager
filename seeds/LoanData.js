const { faker } = require("@faker-js/faker"); // import faker
const { Loan, User } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 100; // Adjust this to the total number of records you want to generate
let idArray = []; //empty array meant to hold user data id

//extract all information from the User database, to grab ids
async () => {
  await Loan.sync({ force: true });

  try {
    const userData = await User.findAll();
    idArray = userData.map((userData) => userData.id);
    //console.log("idArray", idArray);
    const loanData = []; //create variable object to send into db
    for (let i = 0; i < TOTAL_RECORDS; i++) {
      //loop through the amount of records you want to create
      //these values will generate every loop
      const checkoutDate = faker.date.past({ years: 3 });
      const dueDate = faker.date.soon({ days: 14, refDate: checkoutDate });

      loanData.push({
        //id
        //checkout_date
        //due date
        //reader_id

        //generate dates in past x years
        checkout_date: checkoutDate,
        due_date: dueDate,
        //pick a random id from the users to assign the loan to
        card_id: idArray[Math.floor(Math.random() * idArray.length)],
      });
    }

    await Loan.bulkCreate(loanData); //create records by inserting the book data.

    console.log(`Successfully seeded ${TOTAL_RECORDS} records for Loan Model.`);
  } catch (error) {
    console.error("Error seeding Loan Model:", error);
  }

  // Close the connection after the operation
  await Loan.sequelize.close();
};
