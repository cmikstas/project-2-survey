// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app)
{
    /****************************** Add additional API routes here. ******************************/

    //Get all the surveys that the specified user is a part of.
    app.get("/api/usersurveys/:username", isAuthenticated, function(req, res)
    {
        if (req.user)
        {
            //Get all the surveys the current user belongs to.
            db.SurveyTaker.findAll(
            {
                where:
                {
                    Username: req.user.username
                },
                include: 
                [{
                    //Get the survey description for each survey.
                    model: db.Survey,
                    include:
                    [{
                        //Get the owner of the survey.
                        model: db.User,
                        attributes: ["username", "id"]
                    }]
                }]
            })
            .then(function(data)
            {
                res.json(data);
            });
        }

        else
        {
            res.redirect("login");
        }
    });

    //Delete a survey taker from a survey. ID is row in turveytakers table.
    app.delete("/api/deletesurveytaker/:id", isAuthenticated, function(req, res)
    {
            
        db.SurveyTaker.destroy(
        {
            where:
            {
                id: req.params.id
            }
        })
        .then(function(dbSurveyTaker)
        {
            res.json(dbSurveyTaker);
        })
        .catch(function(error)
        {
            throw error;
        });
    });

    //Mark a survey as read. ID is row in turveytakers table.
    app.put("/api/markasread/:id", isAuthenticated, function(req, res)
    {
        db.SurveyTaker.update(
        {
            isRead: true
        },
        {
            where:
            {
                id: req.params.id
            }
        })
        .then(function(dbBurger)
        {
            res.json(dbBurger);
        })
        .catch(function(error)
        {
            throw error;
        });
    });

    





    /*********************************** Authentication Routes ***********************************/
    
    //Using the passport.authenticate middleware with our local strategy.
    //If the user has valid login credentials, send them to the members page.
    //Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), 
    function(req, res)
    {
        res.json(req.user);
    });

    //Route for signing up a user. The user's password is automatically hashed and
    //stored securely thanks to how we configured our Sequelize User Model. If the
    //user is created successfully, proceed to log the user in, otherwise send back
    //an error.
    app.post("/api/signup", function(req, res)
    {
        db.User.create(
        {
            username:           req.body.username,
            email:              req.body.email,
            password:           req.body.password,
            allowNotifications: true,
            surveyCount:        0,
            unreadSurveys:      0
        })
        .then(function()
        {
            res.redirect(307, "/api/login");
        })
        .catch(function(err)
        {
            res.status(401).json(err);
        });
    });

    //Route for logging user out
    app.get("/logout", function(req, res)
    {
        req.logout();
        res.redirect("/");
    });

    //Route for getting some data about our user to be used client side
    app.get("/api/user_data", isAuthenticated, function(req, res)
    {
        if (!req.user)
        {
            //The user is not logged in, send back an empty object
            res.json({});
        } 
        else
        {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json(
            {
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }     
    });
};
