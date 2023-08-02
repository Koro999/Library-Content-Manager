const router = require('express').Router();
const { User } = require('../../models'); //make sure the route here is correct 

//NOTE: userRoutes, will handle anything pertaining to user information ex. login logout signup etc

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

  //handles the logout 
  //route is accessed when you press logout 
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;
