
// 地图接口的请求
const router = require('koa-router')()
const dbs = require('../dbtemplate/index');

router.get('/info', async (ctx, next) => {
  const data = await dbs.Infors.findOne()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})

module.exports = router