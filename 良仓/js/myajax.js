myajax=window.myajax={};
//get方法
myajax.get=function(URL,stringJSON,callback){
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest;
	}else{var xhr=new ActiveXObject("Microsoft.XMLHTTP");}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
				callback(null,xhr.responseText);
			}else{
				//callback(throw new Error('数据获取失败'),undefined);
			}
		}
	}
	var str=myajax.JSONToString(stringJSON);
	URL=str?(URL+'?'+str):URL;
	xhr.open('get',URL,true);
	xhr.send();
}
//post方法
myajax.post=function(URL,stringJSON,callback){
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest;
	}else{var xhr=new ActiveXObject("Microsoft.XMLHTTP");}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
				callback(null,xhr.responseText);
			}else{
				//callback(new Error('数据获取失败'),undefined);
			}
		}
	}
	var str=myajax.JSONToString(stringJSON);
	URL=str?(URL+'?'+str):URL;
	xhr.open('post',URL,true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(str);
}
//JSON转字符串
myajax.JSONToString=function(JSON){
		var arr=[];
		for(var k in JSON){
			arr.push(k+'='+encodeURIComponent(JSON[k]));
}
return  arr.join('&');
}
