const { PRIVITE_KEY, EXPIRESD } = require("../config").token
const jwt = require("jsonwebtoken");

const payload = {
    user: 'wangxuanq',

}
const signToken = jwt.sign(payload,PRIVITE_KEY,{expiresIn:-EXPIRESD}); //生成token
console.log(signToken)
if(signToken) {
    let decodeToken = null;
    jwt.verify(signToken, PRIVITE_KEY, (err, decoded) => {
        if(err) {
            console.log(err);
        }
        console.log(decoded)
    })

}

