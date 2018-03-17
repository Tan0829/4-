window.onload=function(){
	//验证手机号
	var phone=document.getElementById('phone');
	var error=document.getElementById('error');
	var close=document.getElementById('close-error');
	var errinfo=document.getElementById('errinfo');
	close.onclick=function(){error.style.display='none';}
	var re=/^1[34578]\d{9}$/;
	phone.onblur=function(){
		var rephone=phone.value;
		if(!re.test(rephone)){
			errinfo.innerHTML='请填写正确的手机号';
			error.style.display='block';
		}
	}
	//验证码
	var re1=/^[\w\d]{4}$/;
	var yzm=document.getElementById('yzm');
	var yzmimg=document.getElementById('yzmimg');
	var change=document.getElementById('change');
	var confyzm=document.getElementById('confyzm');
	var re2=/^[\d]{6}$/;
	var re3=/^[\d]+$/;
	var time=60;
	yzm.onfocus=function(){
		if(phone.value==''){//未输入正确手机号不能获取验证码
			errinfo.innerHTML='请填写正确的手机号';
			error.style.display='block';
		}
	}
	yzm.onblur=function(){
		var reyzm=yzm.value;
		if(re1.test(reyzm)){//图形验证码
			yzm.value='';
			yzm.placeholder='输入手机验证码';
			yzm.style.width='164px';
			yzm.style.marginRight='10px';
			change.style.display='none';
			yzmimg.style.display='none';
			timer=setInterval(function(){
				confyzm.innerHTML='重新发送('+time+')';
				time--;
				if(time==-1){
					clearInterval(timer);
					confyzm.style.background='#adcce6';
					confyzm.innerHTML='免费获取验证码';
					time=60;
				}
			},1000);
			confyzm.style.display='block';
		}else if(re2.test(reyzm)){//手机验证码
			yzm.value=reyzm;
		}else if(re3.test(reyzm)){
			errinfo.innerHTML='手机验证码有误！';
			error.style.display='block';
		}else{
			errinfo.innerHTML='图形验证码有误！';
			error.style.display='block';
		}
	}
	var timer;
	confyzm.onclick=function(){
		timer=setInterval(function(){
			confyzm.style.background='#d4d7d9';
			confyzm.innerHTML='重新发送('+time+')';
			time--;
			if(time==-1){
				clearInterval(timer);
				confyzm.style.background='#adcce6';
				confyzm.innerHTML='免费获取验证码';
				time=60;
			}
		},1000);
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
			errinfo.innerHTML='手机验证码有误！';
			error.style.display='block';
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
		}
	}
	confpw.onblur=function(){
		if(crecode.value!=confpw.value ){
			errinfo.innerHTML='密码不一致。';
			error.style.display='block';
		}
	}
	//点击立即登录验证密码
	var rightnow=document.getElementById('rightnow');
	rightnow.onclick=function(){
		$.post("http://h6.duchengjiu.top/shop/api_user.php?application/x-www-form-urlencoded",{"status":"register","username":phone.value,"password":confpw.value},function(data){
			if(data.code==2001){
				errinfo.innerHTML='用户名已存在';
				error.style.display='block';
			}else{
				localStorage.setItem("username",phone.value);
				localStorage.setItem("token",data.data[3]);
				window.location.href='login-se.html';
			}
		})
	}
	//登录
	var login=document.getElementById('login');
	login.onclick=function(){
		window.location.href='login-se.html';
	}
	
}
