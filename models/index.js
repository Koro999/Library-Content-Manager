const Book = require('./Book')
const Genre = require('./Genre');
const Loan = require('./Loan');
const User = require('./User')
const BookGenre = require('./BookGenre')

//Model Associations 

//one to many relationship
//User has many Loans
User.hasMany(Loan, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});
//Loans belong to one User
Loan.belongsTo(User, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE'
})

//one to many relationship
//in the scenario where there are multiple copies of a book
//there would be multiple entries of said book in the db
//I'm guessing a copy tab would keep track of that in someway
//Loans belong to many books
Loan.hasMany(Book, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE'
  });
//Books belong to a Loan
Book.belongsTo(Loan, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE'
})

//many to many relationship
//Books have many genres
Book.belongsToMany(Genre, {
    through: BookGenre, //this is association for a junction table 
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})
//Genres belong to many books
Genre.belongsToMany(Book, {
    through: BookGenre,//this is association for a junction table 
    foreignKey: 'genre_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Book, Genre, Loan, BookGenre};

//hasMany == one to many
//belongstoMany = many to many 