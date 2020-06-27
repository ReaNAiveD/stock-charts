import * as mongoose from 'mongoose'
// const mongoose = require('mongoose');

const URI = 'mongodb://root:123456@101.37.80.37:27017/stock_analysis?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(URI);
// let conn = mongoose.createConnection(URI);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + URI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
export default mongoose;
