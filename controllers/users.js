User = require("../models/user");


module.exports.createUser = async (req, res) => {
    try {
        let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to WanderLust !!");
        res.redirect("/listings");
    });
    
    }catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.getUser = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.authUser = async (req, res) => {

        req.flash("success","Welcome to WanderLust, Login Successful!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.signOutUser = (req, res, next)=> {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Will Catch up soon, You are now logged out");
        res.redirect("/listings");
    });
};