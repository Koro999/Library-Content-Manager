const Book = require('./Book')
const Genre = require('./Genre');
const Loan = require('./Loan');
const User = require('./User')
const BookGenre = require('./BookGenre')

//Model Associations 

//one to many relationship
//User has many Loans
User.hasMany(Loan, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Loans belong to one User
Loan.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

//one to many relationship
//Loans belong to many books
Loan.belongsTo(Book, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
  });
//Books belong to many Loans
Book.hasMany(Loan, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})

//many to many relationship
//Books have many genres
Book.belongsToMany(Genre, {
    through: BookGenre,
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})
//Genres belong to many books
Genre.belongsToMany(Book, {
    through: BookGenre,
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Book, Genre, Loan };

//hasMany == one to many
//belongstoMany = many to many 