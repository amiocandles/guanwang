//模型文件
const mongoose = require('mongoose')
const schema = new mongoose.Schema({//定义模型的字段有哪些
    name: {type: String},
    items: [{
        image: {type: String},
        url: {type: String}
    }]
})
module.exports = mongoose.model('Ad', schema)
