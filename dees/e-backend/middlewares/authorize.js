const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied! No token provided!!");

    else token = token.split(" ")[1].trim();//Bearer 1234
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        return res.status(400).send("Invalid token");
    }



}