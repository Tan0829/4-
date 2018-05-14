var db=require("../model/db.js");
var md5=require("md5");
var formidable=require("formidable");
var fs=require("fs");
var gm=require("gm");
exports.check=function(req,res){//注册检查用户名
	var name=req.body.username;
	db.find("userinfo",{"username":name},function(err,result){
		if(err){
			console.log(err);
			res.send("-1");
			return;
		}
		if(result.length!=0){
			console.log(result);
			res.send("1");//存在为1
		}else{res.send("0")}//不存在未0
	})
}
exports.find=function(req,res){//登录检查用户名
	var name=req.body.username;
	db.find("userinfo",{"username":name},function(err,result){
		if(err){
			console.log(err);
			res.send("-1");
			return;
		}
		res.send(result);
	})
}
exports.finduser=function(req,res){//查找所有用户
	db.find("userinfo",{},function(err,result){
		if(err){
			console.log(err);
			res.send("-1");
			return;
		}
		res.send(result);
	})
}
exports.regist=function(req,res){//注册
	var name=req.body.username;
	var pwd=md5(md5(req.body.password));
	var icon=req.body.icon;
	db.insert("userinfo",[{"username":name,"password":pwd,"icon":icon}],function(err,result){
		if(err){console.log(err);res.send("-1");return;}
		res.send(result);
	})
}
exports.checkpwd=function(req,res){//登录检查密码
	var name=req.body.username;
	var pwd=md5(md5(req.body.password));
	db.find("userinfo",{"username":name},function(err,result){
		if(err){
			console.log(err);
			res.send("-1");
			return;
		}
		if(result[0].password==pwd){res.send("1");}
		else{res.send("0")}
	})
}
exports.fabiao=function(req,res){//发表
	var name=req.body.username;
	var title=req.body.title;
	var content=req.body.content;//修改过的
	var icon=req.body.icon;
	var data=new Date();
	var id=new Date().getTime()+"";
	var day=data.getFullYear()+"年"+(data.getMonth()+1)+"月"+data.getDate()+"日　";
	var time=day+data.getHours()+":"+(data.getMinutes()>10?data.getMinutes():"0"+data.getMinutes());
	db.insert("fabiao",[{"id":id,"username":name,"title":title,"content":content,"time":time,"icon":icon,"pinlun":[]}],function(err,result){
		if(err){
			console.log(err);
			res.send("-1");
			return;
		}
		res.send(result);
	})
}
exports.pinlun=function(req,res){//评论
	var mainname=req.body.mainname;
	var targetname=req.body.targetname;//修改过的
	var info=req.body.info;
	var id=req.body.id;
	var data=new Date();
	var day=data.getFullYear()+"年"+(data.getMonth()+1)+"月"+data.getDate()+"日　";
	var times=day+data.getHours()+":"+(data.getMinutes()>10?data.getMinutes():"0"+data.getMinutes());
	db.update("fabiao",{"id":id},{$push:{"pinlun":{"mainname":mainname,"info":info,"times":times}}},function(err,result){
		if(err){console.log(err);res.send("-1");return;}
		res.send(result);
	})
}
exports.uploadicon=function(req,res){//上传头像
	var form=new formidable.IncomingForm();
	form.uploadDir="./public/img";
	form.keepExtensions = true;
	//接收
	form.parse(req, function(err, filds, files){
		if(err){
			console.log(err);
			res.send('-1');
			return;
		}
		var oldPath = './' + files.imgs.path;
		var newPath = './public/img/'+filds.name+'.png';
		fs.rename(oldPath, newPath, function(err){
			if(err){
				console.log(err);
				res.send('改名失败');
				return;
			}
			res.send(newPath); //1表示成功
		})
	})
}
exports.changeicon=function(req,res){//更改头像
	var name=req.body.username;
	var icon=req.body.icon;
	db.update("userinfo",{"username":name},{$set:{"icon":icon}},function(err,result){
		if(err){console.log(err);return;}
		db.update("fabiao",{"username":name},{$set:{"icon":icon}},function(err,result){
			if(err){console.log(err);return;}
			res.send(result);
		})
	});
}
exports.findfb=function(req,res){//查询发表数据
	var name=req.body.username;
	var page=req.body.page;
	db.find("fabiao",{"username":name},{"pageSize":8,"page":page},{"id":-1},function(err,result){//修改过的
		if(err){console.log(err);return;}
		res.send(result);
	})
}
exports.findfball=function(req,res){//查询所有发表数据
	var page=req.body.page;
	db.find("fabiao",{},{"pageSize":8,"page":page},{"id":-1},function(err,result){//修改过的
		if(err){console.log(err);return;}
		res.send(result);
	})
}
exports.changename=function(req,res){//更改用户名
	var oldname=req.body.oldname;
	var newname=req.body.newname;
	db.update("userinfo",{"username":oldname},{$set:{"username":newname}},function(err,result){
		if(err){console.log(err);return;}
		db.update("fabiao",{"username":oldname},{$set:{"username":newname}},function(err,result){
			if(err){console.log(err);return;}
		})
		res.send("1");
	});
}
exports.changemima=function(req,res){//更改密码
	var name=req.body.username;
	var pwd=md5(md5(req.body.password));
	db.update("userinfo",{"username":name},{$set:{"password":pwd}},function(err,result){
		if(err){console.log(err);return;}
		res.send("1");
	})
}
exports.count=function(req,res){//单个计数
	var name=req.body.username;
	db.count("fabiao",{"username":name},function(err,result){
		if(err){console.log(err);return;}
		res.send(result+" ");
	})
}
exports.countall=function(req,res){//计总数
	db.count("fabiao",{},function(err,result){
		if(err){console.log(err);return;}
		res.send(result+" ");
	})
}