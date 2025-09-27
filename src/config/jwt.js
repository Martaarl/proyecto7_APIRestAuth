const jwt = require("jsonwebtoken");

const generateSign = (id) => {
    return jwt.sign({id}, "process.env.JWT_SECRET", {expiresIn: "1y"});
}

module.exports={generateSign};