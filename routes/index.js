const router = require('koa-router')()
const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')
// var useInfo = require('../data.json')
// const db = mongoose.connect("mongodb://localhost/ops")
const cors = require('koa2-cors') //跨域使用
const bodyParser = require('koa-bodyparser');
const session=require('koa-session');
import dbs from '../dbtemplate/index';
app.keys = ['this is my secret and fuck you all'];//我理解为一个加密的密钥

app.use(session({
  key: 'koa:sess', /** cookie的key。 (默认是 koa:sess)  */
  maxAge: 60*1000*30, /** session 过期时间，以毫秒ms为单位计算，这里表示半个小时 */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，
  					那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，
  					这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
},app));

app.use(bodyParser());
app.use(cors());

// const compose = require('koa-compose')
// const glob = require('glob')
// const { resolve } = require('path')

const registerRouter  = require('../req/index.js');

// import reqIndx from '../req/index.js'
// import reqProduct from '../req/product.js'
// import reqMap from '../req/map.js'
// import reqInfo from '../req/info.js'
// import reqUsers from '../req/users.js'
// import reqList from '../req/list.js'

// router.get('/map', async (ctx, next) => {
//   const data = await dbs.MapData.findOne()
//   const result = {
//     code:200,
//     response: data,
//     ts: 12345
//   }
//   ctx.body = result
// })


// router.get('/usertables', async (ctx, next) => {
//   const data = await dbs.UserTables.find()
//   const result = {
//     code:200,
//     response: data,
//     ts: 12345
//   }
//   ctx.body = result
//   // return result
// })

// router.get('/users', async (ctx, next) => {
//   const data = await dbs.User.find()
//   const result = {
//     code:200,
//     response: data,
//     ts: 12345
//   }
//   ctx.body = result
//   // return result
// })

// compose 整合多个路由文件
// var registerRouter = function() {
//     let routers = [];
//     glob.sync(resolve(__dirname, '../req/', '**/*.js'))
//         .filter(value => (value.indexOf('index.js') === -1))
//         .map(router => {
//             routers.push(require(router).routes())
//             routers.push(require(router).allowedMethods())
//         })
//     return compose(routers)
// }

// 地图接口
// app.use(reqMap.routes())
// app.use(reqMap.allowedMethods())

// // 产品接口
// app.use(reqProduct.routes())
// app.use(reqProduct.allowedMethods())

// // 个人信息接口
// app.use(reqInfo.routes())
// app.use(reqInfo.allowedMethods())

// // 用户接口
// app.use(reqUsers.routes())
// app.use(reqUsers.allowedMethods())

// // 列表接口
// app.use(reqList.routes())
// app.use(reqList.allowedMethods())

// app.use(reqIndx.routes())
// app.use(reqIndx.allowedMethods())

app.use(registerRouter());

//引用了 路由  也配置了 路由 接下来 启动路由
// app.use(router.routes())  //启动路由
 
// app.use(router.allowedMethods())  // 建议配置 可以省略  作用是设置一个对应的响应头

// app.use(registerRouter());

app.listen(9000)

// export default router
