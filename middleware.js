module.exports.isLoggedIn = (req,res,next)=>{
     // To check if user doesn't login, first he must be logged-in our website
     if(!req.isAuthenticated()){
        req.flash("error","You must be logged-in first");
        return res.redirect("/login");
    }
    next();
}