const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User', new Schema({
    username: String,
    password: String
}))

// 返回一个mongo用户库实例
module.exports = {
    user: User
};
