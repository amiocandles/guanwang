//导出一个函数，函数接受一个app对象
module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    //express的子路由
    const router = express.Router({
        mergeParams: true //合并url参数
    })

    //创建资源
    router.post('/', async (req, res) => {//需要把数据存进去
        const model = await req.Model.create(req.body)//创建数据
        res.send(model)//发送给客户端，让客户端知道创建完成了，创建的数据是什么
    })

    //更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    //资源列表接口
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)//发送给前端，让前端知道创建完成了，创建的数据是什么
    })

    //资源详情
    router.get('/:id', async (req, res) => {//分类列表接口
        const model = await req.Model.findById(req.params.id)
        res.send(model)//发送给前端，让前端知道创建完成了，创建的数据是什么
    })

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware=require('../../middleware/resource')

    app.use('/admin/api/rest/:resource',authMiddleware(), resourceMiddleware(), router)//挂载子路由

    const multer = require('multer')
    //上传中间件 dest目标地址
    const upload = multer({dest: __dirname + '/../../uploads'})
    //允许上传接口接收文件
    app.post('/admin/api/upload',authMiddleware() ,upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录的路由
    app.post('/admin/api/login', async (req, res) => {
        //定义结构赋值
        const {username, password} = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')//把密码取出来
        assert(user, 422, '用户不存在')
        // 2.校验密码
        //比较明文和密文是否匹配
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))//app.get获取配置
        res.send({token})
    })
    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
