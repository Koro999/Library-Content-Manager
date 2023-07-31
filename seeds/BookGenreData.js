const { BookGenre, Book, Genre } = require("../models"); // Import your Sequelize model here

const TOTAL_RECORDS = 20; // Adjust this to the total number of records you want to generate

async function seedBookGenreData() {
  await BookGenre.sync({ force: true });

  try {
    const bookData = await Book.findAll(); //grab all book info
    const genreData = await Genre.findAll(); // grab all genre info

    //map out data to grab only ids, filter out undefined
    const genreIdArray = genreData.map((genreData) => genreData.id).filter((genreId) => genreId !== undefined);; 
    
    const bookGenreData = []; //create variable object to send into db
    
    bookData.forEach((book) => { //iterate through each instance created in books
      //this will add 1-3 genres to a book
      const randomGenreCount = Math.floor(Math.random() * 3) + 1; // Generate a random count between 1 and 3
      //A set is a built in object in JS that allows storage of unique values
      const randomGenreIndices = new Set(); // Use a set to avoid duplicate genres

      while (randomGenreIndices.size < randomGenreCount) { //run a loop until the set contains randomGenreCount of unique indices
        const randomIndex = Math.floor(Math.random() * genreData.length); // Generate a random index within the genres array
        randomGenreIndices.add(randomIndex); //add the randomly generated index to the set, if duplicate it doesn't add
      }

      //for each item in randomGenreIndices == randomGenreCount
      randomGenreIndices.forEach((randomIndex) => {
        //push into the bookGenreData array
        bookGenreData.push({
          book_id: book.id, //book
          genre_id: genreIdArray[randomIndex], //genre
        });
      });
    });

    console.log(bookGenreData)

    await BookGenre.bulkCreate(bookGenreData); //create records by inserting the book data.

    console.log(
      `Successfully seeded ${TOTAL_RECORDS} records for BookGenre Model.`
    );
  } catch (error) {
    console.error("Error seeding BookGenre Model:", error);
  }
}

module.exports = seedBookGenreData;
