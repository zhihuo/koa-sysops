
// 地图接口的请求
const router = require('koa-router')()
const dbs = require('../dbtemplate/index');

// router.prefix('/list');

router.get('/usertables', async (ctx, next) => {
  const data = await dbs.UserTables.find()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})

module.exports = router