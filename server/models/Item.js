//模型文件
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//定义模型的字段有哪些
    name: {type: String},
    icon: {type: String}//String保存的是图片上传地址
})

module.exports = mongoose.model('Item', schema)
