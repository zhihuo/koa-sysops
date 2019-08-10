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

const registerRouter  = require('../req/index.js');

// import reqProduct from '../req/product.js'

// // 产品接口
// app.use(reqProduct.routes())
// app.use(reqProduct.allowedMethods())


app.use(registerRouter());

//引用了 路由  也配置了 路由 接下来 启动路由
// app.use(router.routes())  //启动路由
 
// app.use(router.allowedMethods())  // 建议配置 可以省略  作用是设置一个对应的响应头

app.listen(9000)

// export default router
