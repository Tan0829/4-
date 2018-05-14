window.onload=function(){
	//验证手机号
	var phone=document.getElementById('phone');
	var error=document.getElementById('error');
	var close=document.getElementById('close-error');
	var errinfo=document.getElementById('errinfo');
	close.onclick=function(){error.style.display='none';}
	var info=document.getElementById("info");
	var reuser=/[\d\w]{3,20}/;
	var code=-1;
	phone.oninput=function(){
		var rephone=phone.value;
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_user.php",
			async:false,
			data:{"status":"check","username":rephone},
			success:function(data){
				if(data.code==1000){info.innerHTML="用户名不可用";info.style.color="red";code=1000;}
				else if(data.code==2001){info.innerHTML="用户名已存在";info.style.color="red";code=2001;}
				else if(data.code==0){info.innerHTML="用户名可用";info.style.color="green";code=0;}
				if(rephone==""){info.innerHTML="3-20位数字、字母、下划线";code=1000;info.style.color="#cccccc";}
			}
		});
	}
	//验证码
	var yzm=document.getElementById('yzm');
	var yzmimg=document.getElementById('yzmimg');
	var change=document.getElementById('change');
	var confyzm=document.getElementById('confyzm');
	yzm.onfocus=function(){
		if(code!=0){//未输入正确手机号不能获取验证码
			errinfo.innerHTML='请填写正确的用户名';
			error.style.display='block';
		}
	}
	//随机生成验证码的方法
	function randyzm(){
		var str="0123456789abcdefghijklmnopqrstuvwxyz0123456789";//46个
		var abox=str.split("");
		var newarr=[];
		for(var i=0;i<4;i++){
			newarr.push(abox[parseInt(Math.random()*46)]);
		}
		var newstr=newarr.join("");
		yzmimg.innerHTML=newstr;
	}
	randyzm();
	change.onclick=function(){randyzm();}
	yzm.onblur=function(){
		if(yzm.value==""){
			errinfo.innerHTML='请输入图形验证码!';
			error.style.display='block';
			setTimeout(function(){error.style.display='none';},1000);
		}else if(yzm.value!=yzmimg.innerHTML){
			errinfo.innerHTML='图形验证码有误!';
			error.style.display='block';
			setTimeout(function(){error.style.display='none';},1000);
		}
	}
	//创建密码
	var crecode=document.getElementById('crecode');
	var re4=/[\d]/;//数字
	var re5=/[a-z]/;//小写字母
	var re6=/[A-Z]/;//大写字母
	var re7=/[\.\*\/\\!\/]/;//符号
	var a=0,b=0,c=0,d=0;
	var p1=document.getElementById('p1');
	var p2=document.getElementById('p2');
	var p3=document.getElementById('p3');
	crecode.onfocus=function(){
		if(yzm.value==''){//未输入验证码不能创建密码
			errinfo.innerHTML='请输入图形验证码！';
			error.style.display='block';
			setTimeout(function(){error.style.display='none';},1000);
		}
	}
	crecode.oninput=function(){//密码强度
		var pw=crecode.value;
		var count=0;
		if(re4.test(pw)){count++;}
		if(re5.test(pw)){count++;}
		if(re6.test(pw)){count++;}
		if(re7.test(pw)){count++;}
		if(count==0){p1.style.display='none';}
		if(count==1){p1.style.display='block';p2.style.display='none';p3.style.display='none';}
		else if(count==2){p2.style.display='block';p3.style.display='none';}
		else if(count==3||count==4){p3.style.display='block';}
	}
	//确认密码
	var confpw=document.getElementById('confpw');
	confpw.onfocus=function(){
		var pw=crecode.value;
		var apw=pw.split('');
		if(apw.length>=6 && apw.length<=20){}
		else{
			errinfo.innerHTML='输入密码需在6位到20位之间。';
			error.style.display='block';
			setTimeout(function(){error.style.display='none';},1000);
		}
	}
	confpw.onblur=function(){
		if(crecode.value!=confpw.value ||crecode.value==""){
			errinfo.innerHTML='密码不一致。';
			error.style.display='block';
			setTimeout(function(){error.style.display='none';},1000);
		}
	}
	//点击立即登录验证密码
	var rightnow=document.getElementById('rightnow');
	rightnow.onclick=function(){
		$.post("http://h6.duchengjiu.top/shop/api_user.php?application/x-www-form-urlencoded",{"status":"register","username":phone.value,"password":confpw.value},function(data){
			if(data.code==0){
				localStorage.setItem("username",phone.value);
				localStorage.setItem("token",data.data[3]);
				setTimeout(function(){window.location.href='login.html';},1200);
				errinfo.innerHTML='注册成功，请登录';
				error.style.display='block';
			}else{
				errinfo.innerHTML='请完善您的信息！';
				error.style.display='block';
				setTimeout(function(){error.style.display='none';},1000);
			}
		})
	}
	//登录
	var login=document.getElementById('login');
	login.onclick=function(){
		window.location.href='login.html';
	}
	
}
