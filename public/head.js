// 做接口的请求
const router = require('koa-router')()
const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors') //跨域使用
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(cors());

module.exports = router