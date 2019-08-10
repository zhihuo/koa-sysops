const router = require('koa-router')()
const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
var useInfo = require('../data.json')
const db = mongoose.connect("mongodb://localhost/ops")
const cors = require('koa2-cors') //跨域使用
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(cors());

// // 账户的数据库模型
var UserSchema = new mongoose.Schema({
    name:String,
    id:String
});

var userTablesSchema =  new mongoose.Schema({
  data: String,
  name: String,
  address: String
});

var infors =  new mongoose.Schema({
  name: String,
  age: String,
  sex: String
});

var UserTables = mongoose.model('usertables',userTablesSchema);
var User = mongoose.model('users',UserSchema);
var MapData = mongoose.model('alirls',UserSchema);
var Infors = mongoose.model('infors',UserSchema);
var Products = mongoose.model('products',UserSchema);

// 新增数据
// var user = {
//   name: 'zhoutian',
//   age: '20',
//   sex: 'man'
// }
// var newUser = new User(user);
// newUser.save();




router.get('/usertables', async (ctx, next) => {
  const data = await UserTables.find()
  const result = {
		code:200,
		response: data,
		ts: 12345
	}
	ctx.body = result
  // return result
})

router.get('/users', async (ctx, next) => {
  const data = await User.find()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
  // return result
})

router.get('/info', async (ctx, next) => {
  const data = await Infors.findOne()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})

router.get('/products', async (ctx, next) => {
  const data = await Products.find()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})
// 新增
router.post('/addproducts', async(ctx, next) => {
  let postData = await parsePostData(ctx);
  console.log('1=====', postData, '****', postData[0]);
  ctx.response.body = {status:200,msg:'添加成功！',data: postData};
  var d;
  for (var i in postData) {
    console.log('2====', i)
    d = JSON.parse(i)
  }
  console.log('d====', d)
  // console.log('1===', ctx)
  // console.log('2===', ctx.request.body)
  // ctx.body =  )
  // const data = await Products.insert(postData[0])
  var productInset = new Products(d);
  productInset.save();
})

// 删除
// router.post('/delproducts',async (ctx,next) => {
//   let postData = ctx.request.body;
//   console.log('删除===', ctx, '*****', postData)
//   ctx.response.body = {status:200,msg:'这是post测试的返回数据',data: postData};
// });


router.post('/delproducts',async(ctx)=>{  //请求操作需要使用post
    ctx.body= ctx.request.body  //  ctx.request.body  把前端传过来的数据封装成为一个对象
    console.log('*****', ctx.request.body)
 })
// router.post('/delproducts', async(ctx, next) => {
//   console.log('del1===', ctx.request.body)
//   let postData = await parsePostData(ctx);
//   // console.log('1=====', postData, '****', postData[0]);
//   // ctx.response.body = {status:200,msg:'添加成功！',data: postData};
//   var d;
//   for (var i in postData) {
//     console.log('2====', i)
//     d = JSON.parse(i)
//   }
//   console.log('d====', d)
//   // console.log('1===', ctx)
//   // console.log('2===', ctx.request.body)
//   // ctx.body =  )
//   // const data = await Products.insert(postData[0])
//   // var productInset = new Products(d);
//   // productInset.save();
// })


router.get('/map', async (ctx, next) => {
  const data = await MapData.findOne()
  const result = {
    code:200,
    response: data,
    ts: 12345
  }
  ctx.body = result
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


// const Koa = require('koa');
// const app = new Koa();
// app.use(async (ctx) => {
//     if ( ctx.url === '/product' && ctx.method === 'POST' ) {
//       // 当POST请求的时候，解析POST表单里的数据，并显示出来
//       let postData = await parsePostData( ctx )
//       ctx.body = postData
//     } else {
//       // 其他请求显示404
//       ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
//     }

//     // 解析上下文里node原生请求的POST参数
//     function parsePostData( ctx ) {
//       return new Promise((resolve, reject) => {
//         try {
//           let postdata = "";
//           ctx.req.addListener('data', (data) => {
//             postdata += data
//           })
//           ctx.req.addListener("end",function(){
//             let parseData = parseQueryStr( postdata )
//             resolve( parseData )
//           })
//         } catch ( err ) {
//           reject(err)
//         }
//       })
//     }

//     // 将POST请求参数字符串解析成JSON
//     function parseQueryStr( queryStr ) {
//       let queryData = {}
//       let queryStrList = queryStr.split('&')
//       console.log( queryStrList )
//       for (  let [ index, queryStr ] of queryStrList.entries()  ) {
//         let itemList = queryStr.split('=')
//         queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
//       }
//       return queryData
//     }

// });


// 解析上下文里node原生请求的POST参数
    function parsePostData( ctx ) {
      return new Promise((resolve, reject) => {
        try {
          let postdata = "";
          ctx.req.addListener('data', (data) => {
            postdata += data
          })
          ctx.req.addListener("end",function(){
            let parseData = parseQueryStr( postdata )
            resolve( parseData )
          })
        } catch ( err ) {
          reject(err)
        }
      })
    }

    // 将POST请求参数字符串解析成JSON
    function parseQueryStr( queryStr ) {
      let queryData = {}
      let queryStrList = queryStr.split('&')
      // console.log( queryStrList )
      for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
      }
      return queryData
    }

// module.exports = router
export default router

