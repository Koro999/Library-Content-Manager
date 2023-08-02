const router = require("express").Router();
const { Loan, Book, User } = require('../models')
//you have to include withAuth for the in order to validate the session
//if you do not have this it cannot authenticate
//how would we know whose account were working with
const withAuth = require("../utils/auth"); 

//Dashboard route
//1. This is it's own seperate layout but will be used as long as your logged in
//2. On load the page will automatically show you checkout history
//3. Will also handle logout


//use withAuth to prevent access to route unless logged in 
//This route specifically will find a user's checkout history, along with the books tied to each loan
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      //the value of session.user_id is assigned back in homeRoutes when we login
      const userData = await User.findByPk(req.session.user_id, { 
        attributes: { exclude: ["password"] }, //exclude the password 
        include: [
            { 
                model: Loan //I include the associated Loan to the card_id
            },
            {
                model: Book, //I include the associated book to the Loan
                attributes: ['title','author'] //here I specify I only want the title and author
            },
        ],
      });
      //serialize the information
      const user = userData.get({ plain: true });
      
      //console log here to check if the information is being grabbed and it's content
      //console.log(user)
      
      //render the view you need, i will use checkoutHistory as an example
      res.render("checkoutHistory", {
        ...user,
        logged_in: true,
        layout: 'dashboard' //define which layout we want to use 
      });
    } catch(err) {
      res.status(500).json(err);
    }
  });

  //handles the logout 
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


//What is this accomplishing?
/*
// Route to get all books borrowed by a user(Reader)
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const BookData = await Loan.findAll({
            include: [
                {
                    model: Book,
                    attributes: ["title"],
                },
                {
                    model: User,
                    attributes:['card_id']
                }
            ]
        })
// Serialize data so the template can read it
 
 const booksWithCardId = loanData.map((loan) => ({
    book: loan.book,
    card_id: loan.user.card_id,
  }));

  // Send the booksWithCardId as the response
  res.json(booksWithCardId);
} catch (error) {
  console.error("Error fetching books:", error);
  res.status(500).json({ error: "Server error" });
}
});*/
