//模型文件
const mongoose = require('mongoose')
const schema = new mongoose.Schema({//定义模型的字段有哪些
    username: {type: String},
    password: {
        type: String,
        select: false,
        set(val) {//接收用户本来填的值
            //散列指数，越高越好，一般10-12
            return require('bcrypt').hashSync(val, 10)
        }
    },
})
module.exports = mongoose.model('AdminUser', schema)
