const { PRIVITE_KEY, EXPIRESD } = require("../config").token
const jwt = require("jsonwebtoken");

const signToken = (user) => jwt.sign({user},PRIVITE_KEY,{expiresIn:EXPIRESD}); //生成token

const auth = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        jwt.verify(token, PRIVITE_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send("非法访问"); 
            }
            if (!decoded.exp) {
                res.status(401).send("非法访问");
            } else {
                next();
            }
        })
    } else {
        res.status(401).send("非法访问");
    }

}
module.exports = {
    signToken: signToken
}