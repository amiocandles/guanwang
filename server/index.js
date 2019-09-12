//服务端入口文件
const express = require("express")

const app = express()

//在当前express实例上设置一个对象
app.set('secret','suiBianSheDe')

app.use(require('cors')())//引入跨域模块
app.use(express.json())
//表示upload下面的东西都是静态文件
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})
