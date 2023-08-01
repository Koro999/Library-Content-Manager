const router = require("express").Router();

const { Loan, Book, User } = require('../models')

// Route to get all books borrowed by a user(Reader)
router.get("/", async (req, res) => {
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
});



//dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Loan,
        attributes: ("card_id")
        }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("dashboard", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });








// Login route
router.get("/login", (req, res) => {
    // If already already logged in use another route
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  });




  