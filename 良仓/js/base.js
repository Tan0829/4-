//验证登录状态
var getuser=localStorage.getItem("username");
var token=localStorage.getItem("token");
var afterlg=document.getElementById('afterlg');//登录后显示个人信息
var getname=document.getElementById('getname');//显示用户名
var quit=document.getElementById('quit');//退出按钮
var loginbg=document.getElementById("loginbg");//页面内登录窗口
var loginbox=document.getElementById("loginbox");
var closebtn=document.getElementById("closebtn");//窗口关闭按钮
var phonenum=document.getElementById("phone");//手机号
var password=document.getElementById("mima");//密码
var catbox=document.getElementById("catbox");//购物车下拉
var whilelogin=document.getElementById("whilelogin");//登录前显示
var disapper=document.getElementById("disapper");//登录后显示
var goodsnum=document.getElementById('goodsnum');//商品数量
var catinfo=document.getElementById("catinfo");//购物车详情
var jumpshop=document.getElementById("jumpshop");	//购物车跳转
var messagein=document.getElementsByClassName("messagein")[0];console.log(messagein);
if(getuser){
	afterlg.style.display="block";
	whilelogin.style.display="block";
	$.get("http://h6.duchengjiu.top/shop/api_cart.php",{"token":token},function(data){
		var obj=data.data;
		getname.innerHTML=getuser;
		disapper.style.display="none";
		if(obj.length==0){return;}
		else{
			cartinfo.innerHTML='';
			var getallnum=0;
			jumpshop.style.color="#cccccc";
			goodsnum.style.display="block";
			for(var i=0;i<obj.length;i++){
			var compile = _.template(headcartinfo);
			cartinfo.innerHTML+=compile(obj[i]);
			getallnum+=parseInt(obj[i].goods_number);
			}
			goodsnum.innerHTML=getallnum;
			messagein.style.top="56px";
		}
	});
}
quit.onclick=function(){//登录后退出，清除本地储存,返回首页
	afterlg.style.display="none";
	localStorage.removeItem("username");
	localStorage.removeItem("token");
	window.location.href="index.html";
	whilelogin.style.display="none";
	disapper.style.display="block";
}
closebtn.onclick=function(){loginbg.style.display="none";}//点击关闭登录窗口
//错误提示
var error=document.getElementById('error');
var close=document.getElementById('close-error');
var errinfo=document.getElementById('errinfo');
close.onclick=function(){error.style.display='none';loginbg.style.display="none";}
//页面内登录窗口验证
var login=document.getElementById("rightnow");
login.onclick=function(){
	$.post("http://h6.duchengjiu.top/shop/api_user.php?application/x-www-form-urlencoded",{"status":"login","username":phonenum.value,"password":password.value},function(data){
		if(data.code==0){
			localStorage.setItem("username",phonenum.value);
			localStorage.setItem("token",data.data.token);
			afterlg.style.display="block";
			loginbg.style.display="none";
			getname.innerHTML=data.data.username;
			whilelogin.style.display="block";
			disapper.style.display="none";
			getuser=localStorage.getItem("username");
			messagein.style.top="56px";
			window.location.reload();
		}else{
			errinfo.innerHTML='账号或者密码错误！';
			error.style.display="block";
			setTimeout(function(){error.style.display='none';loginbg.style.display="none";},1500);
		}
	});
}
//购物车详情
var goodsin=document.getElementById("nogoodsin");//未登录时显示的购物车下拉
if(goodsnum.innerHTML=='' || goodsnum.innerHTML=="0"){goodsnum.style.display="none";}//购物车数字为0
var logincat=document.getElementById('logincat');	//登录后显示的购物车下拉	
var jumpshop=document.getElementById("jumpshop");	//购物车跳转
jumpshop.onclick=function(){
	if(getuser){window.location.href="shopping.html";}
	else{loginbg.style.display="block";}
};
//点击消息跳转
var message=document.getElementById("message");
message.onclick=function(){
	if(getuser){window.location.href="tz.html";}
	else{loginbg.style.display="block";}
}
//点击添加良品
var addinto=document.getElementById("addinto");
addinto.onclick=function(){
	if(getuser){window.location.href="share.html";}
	else{loginbg.style.display="block";}
}
//点击搜索显示/隐藏搜索框
var search=document.getElementById('search');
var searchbox=document.getElementById('searchbox');
var searchinfo=document.getElementById('searchinfo');
var locker=true;
search.onclick=function(){
	if(locker){
		searchbox.style.transform='translate(-260px,0)';
		locker=false;
	}else if(searchinfo.value==''){
		searchbox.style.transform='translate(0,0)';
		locker=true;
	}else{
		$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"search_text":searchinfo.value},function(data){
			window.location.href="search.html?search_text="+encodeURIComponent(searchinfo.value);
		});
	}
}
//导航子菜单
var ul1=document.getElementById('ul1');
$.get('http://h6.duchengjiu.top/shop/api_cat.php',{},function(data){
	var obj=data.data;
	for(var i=0;i<obj.length;i++){
		var li=document.createElement('li');
		var a=document.createElement('a');
		a.href='allgoods.html?cat_id='+obj[i].cat_id;
		var img=document.createElement('img');
		img.src='images/'+(i+1)+'.png';
		var p=document.createElement('p');
		p.innerHTML=obj[i].cat_name;
		a.appendChild(img);
		a.appendChild(p);
		li.appendChild(a);
		ul1.appendChild(li);
	}
})
//商店
var shopbox=document.getElementById('shopbox');
var shop=document.getElementById('shop');
shop.onmouseover=function(){shopbox.style.display='block';}
shop.onmouseout=function(){shopbox.style.display='none';}
shopbox.onmouseover=function(){shopbox.style.display='block';}
shopbox.onmouseout=function(){shopbox.style.display='none';}
//杂志
var magazinebox=document.getElementById('magazinebox');
var magazine=document.getElementById('magazine');
magazine.onmouseover=function(){magazinebox.style.display='block';}
magazine.onmouseout=function(){magazinebox.style.display='none';}
magazinebox.onmouseover=function(){magazinebox.style.display='block';}
magazinebox.onmouseout=function(){magazinebox.style.display='none';}
//分享
var sharebox=document.getElementById('sharebox');
var share=document.getElementById('share');
share.onmouseover=function(){sharebox.style.display='block';}
share.onmouseout=function(){sharebox.style.display='none';}
sharebox.onmouseover=function(){sharebox.style.display='block';}
sharebox.onmouseout=function(){sharebox.style.display='none';}
//footer部分点击二维码跳转
var downld=document.getElementById('downld');
downld.onclick=function(){window.location.href='download.html';}
//头部购物车信息
var cartinfo=document.getElementById("catinfo");
var headcartinfo="<div><a href='goodsdetails.html?goods_id=<%=goods_id%>'><img src='<%=goods_thumb%>'><h1><%=goods_name%></h1><h2>数量：<span><%=goods_number%></span>件</h2><h4 class='headprice'>¥<%=goods_price%></h4></a></div>";
function infoupdata(){
	$.get("http://h6.duchengjiu.top/shop/api_cart.php",{"token":token},function(data){
		var obj=data.data;console.log(obj);
		if(obj.length==0){return;}
		else{
			cartinfo.innerHTML='';
			var getallnum=0;
			jumpshop.style.color="#cccccc";
			for(var i=0;i<obj.length;i++){
			var compile = _.template(headcartinfo);
			cartinfo.innerHTML+=compile(obj[i]);
			getallnum+=parseInt(obj[i].goods_number);
			}
			goodsnum.innerHTML=getallnum;
			goodsnum.style.display="block";
		}
	})
}
//滚动设置导航固定和返回顶部
var setnav=document.getElementsByClassName("nav")[0];
var setnavbox=document.getElementsByClassName("shopbox");
var backtop=document.getElementsByClassName("backtop")[0];
window.onscroll=function(){
	var scrtop=document.body.scrollTop || document.documentElement.scrollTop;
	if(scrtop>=56){
		setnav.style.position="fixed";
		setnav.style.top="0px";
		setnav.style.left="50%";
		setnav.style.marginLeft="-500px";
		for(var i=0;i<setnavbox.length;i++){setnavbox[i].style.top="49px";}
		backtop.style.display="block";
	}else{
		setnav.style.position="";
		setnav.style.top="";
		setnav.style.left="";
		setnav.style.marginLeft="";
		for(var i=0;i<setnavbox.length;i++){setnavbox[i].style.top="105px";}
		backtop.style.display="none";
	}
}
