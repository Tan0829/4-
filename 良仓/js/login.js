window.onload=function(){
	//错误提示
	var error=document.getElementById('error');
	var close=document.getElementById('close-error');
	var errinfo=document.getElementById('errinfo');
	close.onclick=function(){error.style.display='none';}
	//点击登录验证密码
	var rightnow=document.getElementById('rightnow');
	rightnow.onclick=function(){
		var phone=document.getElementById('phone').value;
		var mima=document.getElementById('mima').value;
		$.post("http://h6.duchengjiu.top/shop/api_user.php?application/x-www-form-urlencoded",{"status":"login","username":phone,"password":mima},function(data){
			if(data.code==0){
				localStorage.setItem("username",phone);
				localStorage.setItem("token",data.data.token);
				window.location.href='index.html';
			}else{
				errinfo.innerHTML='账号或者密码错误！';
				error.style.display="block";
			}
		});
	}
	//注册
	var regist=document.getElementById('login');
	login.onclick=function(){
		window.location.href='regist.html';
	}
	//错误提示
	var error=document.getElementById('error');
	var close=document.getElementById('close-error');
	var errinfo=document.getElementById('errinfo');
	close.onclick=function(){error.style.display='none';}
	
}
