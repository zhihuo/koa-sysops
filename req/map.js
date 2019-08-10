
// 地图接口的请求
const router = require('koa-router')()
const dbs = require('../dbtemplate/index');


router.get('/map', async (ctx, next) => {
  const data = await dbs.MapData.findOne()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})

module.exports = router