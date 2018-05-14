(function(){//验证用户
	$("#name").blur(function(){
		if(!$("#name").val()){$("#reguser").removeClass().addClass("blue").html("用户名为6-20个字符");}
		else if($("#name").val().length<6||$("#name").val().length>20){
			$("#reguser").removeClass().addClass("red").html("用户名为6-20个字符");
		}else{
			var name=$("#name").val();
			$.post("/check",{"username":name},function(result){
				if(result=="0"){
					$("#reguser").removeClass().addClass("green").html("用户名可用");
				}else{
					$("#reguser").removeClass().addClass("red").html("用户名已存在");
				}
			})
		}
})})();
(function(){//验证密码
	$("#password").blur(function(){
		if(!$("#password").val()){$("#regpwd").removeClass().addClass("blue").html("密码为6-20个字符");}
		else if($("#password").val().length<6||$("#password").val().length>20){
			$("#regpwd").removeClass().addClass("red").html("密码不可用");
		}else{
			$("#regpwd").removeClass().addClass("green").html("密码可用");
		}
})})();
(function(){//确认密码
	$("#confirm").blur(function(){
		if($("#password").val()!=$("#confirm").val()){$("#regconpwd").removeClass().addClass("red").html("密码不一致");}
		else{$("#regconpwd").removeClass().addClass("green").html("密码正确");}
})})();
(function(){//点击注册
	$("#regist").click(function(){
		if($("#reguser").html()=="用户名可用" && $("#regpwd").html()=="密码可用" && $("#regconpwd").html()=="密码正确"){
			$("#registinfo").removeClass().addClass("green").html("注册成功,请登录");
			setTimeout(function(){
				$(".close-btn").click();
			},1500);
			var name=$("#name").val();
			var pwd=hex_md5(hex_md5($("#password").val()));
			$.post("/regist",{"username":name,"password":pwd,"icon":"img/index.jpg"},function(){});
		}else{$("#registinfo").removeClass().addClass("red").html("请完善注册信息");}
	})
})();
(function(){//登录用户名
	$("#loginname").blur(function(){
		if(!$("#loginname").val()){$("#namehelp").removeClass().addClass("blue").html("用户名为6-20个字符");}
		else if($("#loginname").val().length<6||$("#namehelp").val().length>20){
			$("#namehelp").removeClass().addClass("red").html("用户名不可用");
		}else{
			var name=$("#loginname").val();
			$.post("/check",{"username":name},function(result){
				if(result=="0"){
					$("#namehelp").removeClass().addClass("red").html("用户名不存在,请先注册");
				}else{
					$("#namehelp").removeClass().addClass("green").html("用户名可用");
				}
			})
		}
	})
})();
(function(){//登录
	$("#login").click(function(){
		if($("#namehelp").html()!="用户名可用"){return;}
		var name=$("#loginname").val();
		var pwd=hex_md5(hex_md5($("#loginpwd").val()));
		$.post("/checkpwd",{"username":name,"password":pwd},function(result){
			if(result=="1"){console.log(name)
				localStorage.setItem("weibousername",name);
				location.href="personal.html";
			}else{
				$("#pwdhelp").removeClass().addClass("red").html("密码错误!");
			}
		})
	})
})();

