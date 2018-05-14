//先引入mongodb
var MongoClient = require('mongodb').MongoClient;

//放底层基础业务
var dburl = 'mongodb://127.0.0.1:27017/user';

//每次连接都要去调用
function _connectDB(callback){
	MongoClient.connect(dburl, function(err, client){
		if(err){
			callback(err, null, null)
			return;
		};
		//获取数据库名
		var db = client.db('user');
		callback(null, db, client);
	});
}

//增删改查  都需要调用连接函数
exports.insert = function(collectionName, data, callback){
	if(arguments.length != 3){
		console.log('您必须得传入三个参数，第一个为集合名，第二个数组类型的数据， 第三个为回调函数');
		return;
	};
	//先调用连接方法
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
		//添加数据方方法
		db.collection(collectionName).insertMany(data, function(err, result){
			if(err){
				callback(err, null);
				return;
			};
			callback(null, result);
			client.close();
		});	
	});
};

//查找
exports.find = function(collectionName,json1, A, B, C){
	//判断参数      collectionName,json1, json2, sort, callback
	if(arguments.length == 3){
		//collectionName,json1, callback
		var callback = A;
		var sort = {};
		var pageSize = 8;
		var page = 0;
		console.log('三个参数，第一个为集合名，第二个为查找条件，没有可用{}替换， 第三个为回调函数')
	}else if(arguments.length == 4){
		var callback = B;
		//如果这个传进来的是分页
		if(A.pageSize){
			var pageSize = A.pageSize;
			var page = (A.page - 1) * pageSize;
			var sort = {};
		}else{
			var pageSize = 8;
			var page = 0;
			var sort = A;
		}
	}else if(arguments.length == 5){
		var callback = C;
		var sort = B;
		var pageSize = A.pageSize;
		var page = (A.page - 1) * pageSize;
	}else{
		console.log('您传入的参数不对');
		return;
	}
	
	//先调用连接方法
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
			
		//添加数据方方法
		var cursor = db.collection(collectionName).find(json1).sort(sort).limit(pageSize).skip(page);
		//遍历游标
		var result = [];
		cursor.each(function(err, doc){
			if(err){
				//失败后回调
				callback(err, null);
				return;
			};
			if(doc != null){
				result.push(doc);
			}else{
				//成功遍历结束后回调
				callback(null, result);
				client.close();
			};	
		});
	});
}

//更新
exports.update = function(collectionName,findData, setData, callback){
	//先调用连接方法
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
		//调用更新方法
		db.collection(collectionName).updateMany(findData, setData, function(err, result){
			if(err){
				callback(err, null);
				return;
			};
			callback(null, result);
			client.close();
		})
	});
};

//删除
exports.deleteData = function(collectionName, data, callback){
	//先调用连接方法
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
		//调用更新方法
		db.collection(collectionName).deleteMany(data, function(err, result){
			if(err){
				callback(err, null);
				return;
			};
			callback(null, result);
			client.close();
		})
	});
};

//数量
exports.count = function(collectionName, data, callback){
	//先调用连接方法
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
		//调用更新方法
		db.collection(collectionName).count(data,function(err, result){
			if(err){
				callback(err, null);
				return;
			};
//			console.log(result)
			callback(null, result);
			client.close();
		})
	});
};
exports.rename=function(oldname,newname,callback){
	//	db["a"+oldname].renameCollection(newname);
	_connectDB(function(err, db, client){
		if(err){
			console.log(err);
			return;
		};
		db.collection(oldname).rename(newname);
	});
}





