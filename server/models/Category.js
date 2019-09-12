//模型文件
const mongoose = require('mongoose')

const schema = new mongoose.Schema({//定义模型的字段有哪些
    name: {type: String},
    //父级分类的字段 指定ref表示关联的是那一个模型
    parent:{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

schema.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

module.exports = mongoose.model('Category', schema)
