
// 地图接口的请求
const router = require('koa-router')()
const dbs = require('../dbtemplate/index');

// 登录
router.post('/login', async (ctx, next) => {
  // const data = await dbs.Logins.find()
  // data(ctx.body, (err, data) => {
  const res = ctx.request.body
  await dbs.Logins.findOne(res, (err, data) => {
  	if (err) { throw  err }
  	if (data) {
  		// 设置用户名cookie
  		ctx.session.user = res.name;
      ctx.response.body = {status:200,msg:'登录成功！',data: res};
    }else {
      ctx.response.body = {status:201,msg:'登录失败！',data: res};
    }
  })
})


// 退出登录
router.get('/loginout', async (ctx, next) => {
  	// 清空缓存
  	ctx.session.user = '';
  	const result = {
	    status:200,
	    response: '成功清除缓存！',
	    ts: 12345
	  }
	  ctx.body = result
})

// 注册
router.post('/register', async (ctx, next) => {
	const res = ctx.request.body
  const { name, pwd } = res
  let doc = await dbs.Logins.findOne({ name })
  if (doc) {
  	ctx.response.body = {status:201,msg:'用户名已经存在！',data: res};
  } else {
		var productInset = new dbs.Logins(res);
  	await productInset.save().then(() => {
			ctx.response.body = {status:200,msg:'注册成功！'};
		}).catch((err) => {
			ctx.response.body = {status:500,msg:err};
		});
  }
})

module.exports = router