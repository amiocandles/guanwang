//连接数据库
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true
    })
    //在数据库中用到各种关联，用了A模型和B模型之后，B模型如果没有引入进来就会报错
    require('require-all')(__dirname + '/../models')
}
