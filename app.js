const Koa = require('koa')
// const mongoose = require('mongoose')
import router from './routes'

const app = new Koa()

//引用了 路由  也配置了 路由 接下来 启动路由
app.use(router.routes())  //启动路由
 
app.use(router.allowedMethods())  // 建议配置 可以省略  作用是设置一个对应的响应头

app.listen(9000);
console.log('app started at port 9000...')