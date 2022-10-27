/*
 * @Author: wyf 844650674@qq.com
 * @Date: 2022-10-25 16:57:43
 * @LastEditors: wyf 844650674@qq.com
 * @LastEditTime: 2022-10-26 08:33:40
 * @FilePath: \COMP229.F2022.Midterm.Template-master\config\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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