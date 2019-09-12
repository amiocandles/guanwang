//模型文件
const mongoose = require('mongoose')
const schema = new mongoose.Schema({//定义模型的字段有哪些
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],//分类
    title: {type: String},
    body: {type: String},
},{//时间戳
    timestamps:true
})
module.exports = mongoose.model('Article', schema,)
