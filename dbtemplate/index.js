// 数据库的操作
const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost/ops")
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
// 个人信息
var infors =  new mongoose.Schema({
  name: String,
  age: String,
  sex: String
});
// 登录
var Login =  new mongoose.Schema({
  name: String,
  pwd: String,
  sex: String
});
var User = mongoose.model('users',UserSchema);
var UserTables = mongoose.model('usertables',userTablesSchema);
var MapData = mongoose.model('alirls',UserSchema);
var Infors = mongoose.model('infors',infors);
var Products = mongoose.model('products',UserSchema);
var Logins = mongoose.model('logins',Login);

// 导出数据库
module.exports = {
	MapData,
	User,
	UserTables,
	Infors,
	Products,
  Logins
}