// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
let db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app)
{
    app.get("/", function(req, res)
    {
        res.redirect("/home");
    });

    app.get("/home", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("home");
        }
        else
        {
            res.redirect("login");
        }
    });

    app.get("/makesurvey", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("makeSurvey");
        }
        else
        {
            res.redirect("login");
        }
    });

    app.get("/takesurvey", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("takeSurvey");
        }
        else
        {
            res.redirect("login");
        }
    });

    app.get("/viewsurvey", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("viewSurvey");
        }
        else
        {
            res.redirect("login");
        }
    });

    app.get("/usersettings", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("usersettings");
        }
        else
        {
            res.redirect("login");
        }
    });

    /*********************************** Authentication Routes ***********************************/

    app.get("/login", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("home");
        }
        else
        {
            res.render("login");
        }
    });

    app.get("/signup", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("home");
        }
        else
        {
            res.render("signup");
        }
    });

    //Here we've add our isAuthenticated middleware to this route.
    //If a user who is not logged in tries to access this route they
    //will be redirected to the signup page
    app.get("/home", isAuthenticated, function(req, res)
    {
        res.render("login");
    });
};
