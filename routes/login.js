var express = require('express');
var router = express.Router();
const Token = require('../common/token');
const model = require('../models/model');
const user = model.user;

/* GET users listing. */
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    user.findOne({ username: username }, (err, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            if(err) {
                console.log('find user error!');
                res.status(500).send({
                    msg: '服务器出现错误！',
                    auth: false
                }).end();
                reject();
            }
            if(data) {
                if(data.password === password){
                    resolve(data);
                } else {
                    res.status(400).send({
                        msg: '密码错误！',
                        auth: false
                    }).end();
                }
            } else {
                res.status(400).send({
                    msg: '用户名不存在！',
                    auth: false
                }).end();
            }
        }).then((data) => {
            let token = Token.signToken(JSON.stringify(data));
            res.status(200).send({
                msg: '登陆成功！',
                auth: true,
                token: token
            })
        })
    })

});

module.exports = router;