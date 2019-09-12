module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        //校验用户是否登录
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const {id} = jwt.verify(token, req.app.get('secret'))//verify校验
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)//通过数据库找是否有这个用户
        assert(req.user, 401, '请先登录')
        await next()//中间件处理完之后还会继续执行后面的处理函数
    }
}
