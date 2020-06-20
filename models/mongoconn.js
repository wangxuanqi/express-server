const dbUrl = require('../config').mongolink;
const mongoose = require('mongoose');
const model = require('./model');
const user = model.user;

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
mongoose.connect(dbUrl, { useNewUrlParser: true });
const mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'connection error:'));
module.exports = mongodb.on('connected', () => {
  console.log('Mongoose connection succuss' );
})
user.findOne({username: 'wangxuanqi'}, (err, data) => {
    console.log(data)
})
/**
 * 连接断开
 */
// mongodb.on('disconnected', function () {
//   console.log('Mongoose connection disconnected');
// });

