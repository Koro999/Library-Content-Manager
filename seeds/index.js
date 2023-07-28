const { Sequelize } = require('sequelize');
const { Book, Genre, Loans, User } = require('../models');

//seed using dummy data (faker)
(async () => {
  try {
    // Import and execute the seeding logic for each table
    await require('./seedTable1');
    await require('./seedTable2');
    // Add other tables as needed

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
});

//seed using anything else 
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    /*
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const post of postData) {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    */
    process.exit(0);
  };
  
  seedDatabase();