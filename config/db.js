/*
 * @Author: Chuqi Fan
 * @ID: 301090064
 * @Date: 2022-10-25 16:57:43
 * @LastEditors: Chuqi Fan
 * @LastEditTime: 2022-10-29 08:33:40
 * @FilePath: \COMP229.F2022.Midterm\config\db.js
 * @Description: database
 */
// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://fanchudi:fcd123@cluster0.q9mxvqd.mongodb.net/?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}
