const router = require("express").Router();
const { Loan, Book, User } = require('../../models')
const withAuth = require('../../utils/auth');
//all the usual imports 

//Note: The loanRoute will handle any routes pertaining to loan information

//this route will allow us to pull up a more specific dissertation of the loan 
router.get("/loan/:id", withAuth, async (req, res) => {
    try {
      const postData = await Loan.findByPk(req.params.id, { //search by loan id
        include: [
            { 
                model: User, // include the associated Loan to the card_id
                attributes: { exclude: ["password"] }, //exclude password 
            },
            {
                model: Book //grab associated Book model information
            }
        ],
      });
      //serialize information
      const post = postData.get({ plain: true });

      //console.log to check info manually
      console.log(post)

    //render view 
      res.render("viewLoan", {
        post,
        logged_in: req.session.logged_in,
        layout: 'dashboard' //define which layout we want to use 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
