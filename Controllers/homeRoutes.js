const router = require("express").Router(); //import sequelize
const { Loan, Book, User } = require('../models') //import models for use

//NOTE: Because our homepage is just a login page, it needs to handle two things. 
// 1. Handle the login validation by grabbing information we need to validate the login
// 2. IF we are already logged in (or become logged in), redirect us to the homepage
// 3. by default should use main.handlebars 

// Handles user login validation
// this route is specifically called by the js tied to the login page 
router.post('/login', async (req, res) => {
  try {
    //grab user data, find a user who has the matching email
    //IF we end up using card number, then this needs to be changed
    const userData = await User.findOne({ where: { email: req.body.email } });

    //if the userData is falsey return this error 
    //in this scenario it simply means that that what we entered didn't match anything 
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //validate the password
    //compares the password stored in the database to the password entered
    const validPassword = await userData.checkPassword(req.body.password);

    //if falsey (they don't match), return this error 
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // once all the checks are made we adjust the express-session
    req.session.save(() => {
      req.session.user_id = userData.card_id; //set the session user id (should be card_id because that's how the model is defined)
      req.session.logged_in = true; //set session status as logged in (for checks later)
      
      //return JSON response
      res.json({ 
        user: userData, //the user data is sent using, "user" key
        message: 'You are now logged in!'  //message tied to the message key
      });
    });
  
    //if error show error 
  } catch (err) {
    res.status(400).json(err);
  }
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

  