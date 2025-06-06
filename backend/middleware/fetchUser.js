const jwt = require("jsonwebtoken");

let JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        console.log(token)
        return res.status(401).send("Access denied, please provide a valid token");
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;  
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
