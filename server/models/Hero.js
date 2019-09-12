//模型文件
const mongoose = require('mongoose')
const schema = new mongoose.Schema({//定义模型的字段有哪些
    name: {type: String},
    avatar: {type: String},//String保存的是图片上传地址
    banner:{type:String},
    title: {type: String},//称号
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],//分类
    scores: {//打分
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number}
    },
    skills: [{//技能模型
        icon: {type: String},
        name: {type: String},
        delay: {type: String},
        cost: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],//顺风出装
    items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usageTips: {type: String},//使用技巧
    battleTips: {type: String},//对抗技巧
    teamTips: {type: String},//团战思路
    partners: [{//英雄关系
        hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String},
    }],
})
//如果要手动指定集合名称传第三个参数
module.exports = mongoose.model('Hero', schema,'heroes')
