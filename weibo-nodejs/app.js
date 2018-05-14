var express=require("express");
var app=express();
var router=require("./router/router.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static("./public"));
app.post("/check",router.check);//注册检测用户名
app.post("/checkpwd",router.checkpwd);//验证密码
app.post("/regist",router.regist);//注册通道
app.post("/fabiao",router.fabiao);//发表通道
app.post("/pinlun",router.pinlun);//评论通道
app.post("/find",router.find);//查找用户通道
app.post("/finduser",router.finduser);//查找所有用户
app.post("/uploadicon",router.uploadicon);//上传头像
app.post("/changeicon",router.changeicon);//修改头像
app.post("/findfb",router.findfb);//获取发表的数据
app.post("/findfball",router.findfball);//获取所有发表的数据
app.post("/changename",router.changename);//更改用户名
app.post("/changemima",router.changemima);//修改密码
app.post("/count",router.count);//计数
app.post("/countall",router.countall);//所有发表排序
app.listen(3000);
console.log("done");
