export const authMiddleware = (req, res, next) => 
    {
        const adminToken = req.cookies.token;
    
        if (!adminToken) 
        {
            return res.redirect("/"); // Redirect to homepage if not admin
        }
    
        next(); // Proceed if authenticated
    };
    