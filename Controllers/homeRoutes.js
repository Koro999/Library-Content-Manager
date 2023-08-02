const router = require("express").Router(); //import sequelize
const { Loan, Book, User } = require('../models') //import models for use

//NOTE: Because our homepage is just a login page, it needs to handle two things. 
// 1. Handle the login validation by grabbing information we need to validate the login (all user related routes will be defined in userRoutes)
// 2. IF we are already logged in (or become logged in), redirect us to the homepage
// 3. by default should use main.handlebars 

//NOTE: These routes do are not accessed until we specifically move to  https:// <example>/login , that is done all on the frontend
// I have it like this in should a homepage be inserted at some point it can be done 

router.get('/', (req, res) => {
  res.render('login'); // 
});

// Login route
// On the default homepage
router.get("/login", (req, res) => {
  // If already already logged in redirect to dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  //otherwise render login template
  res.render("login") 
});

module.exports = router;
