const Book = require('./Book')
const Genre = require('./Genre');
const Loan = require('./Loan');
const User = require('./User')

//Model Associations 
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

//Loans have many books
Loan.hasMany(Book, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE'
  });
//Books belong to many Loans
Book.belongsToMany(Loan, {
    foreignKey: 'loan_id',
    onDelete: 'CASCADE'
})

//Books have many genres
Book.hasMany(Genre, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})

//Genres belong to many books
Genre.belongsToMany(Book, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Book, Genre, Loan };
