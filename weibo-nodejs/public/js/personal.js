var name=localStorage.getItem("weibousername");
if(name=="null"){location.href="index.html"}
function init(page){//初始化,获取用户名，图片
	$("#getusername").html("欢迎！ "+name);
	$("#hostname").html(name);
	$.post("/find",{"username":name},function(result){
		$("#headicon").attr("src",result[0].icon);
	});
	$.post("/findfb",{"username":name,"page":page},function(result){
		var modestr=$("#template").html();
		var modestr1=$("#template1").html();
		$(".dttitle").html("我的动态");
		if(result.length==0){$(".dttitle").html("您还没有任何动态");return;}
		$("#dtbox").html("");
		for(var i=0;i<result.length;i++){
			var compile=_.template(modestr);
			var pl=compile(result[i]);
			$(pl).appendTo($("#dtbox"));
			for(var a=0;a<result[i].pinlun.length;a++){
				var compile=_.template(modestr1);
				var pl1=compile(result[i].pinlun[a]);
					$(pl1).appendTo($(".a"+result[i].id));
			}
		}
		$.post("/count",{"username":name},function(result){
			var pagecount=Math.ceil(result/8);
			createpage(pagecount);
		});
		$(".sendpl").each(function(index){
			$(this).click(function(){
				var id=$(this).parent().parent().attr("index");
				var info=$(this).prev().val();
				var mainname=localStorage.getItem("weibousername");
				var targetname=$(this).parent().parent().attr("tagname");
				if(!info){return;}
				$.post("/pinlun",{"mainname":mainname,"targetname":targetname,"info":info,"id":id},function(result){
					$(".text").val("");
					init(1);
				});
			})
		})
	});
};
init(1);
function update(page){
	$.post("/findfb",{"username":name,"page":page},function(result){
		var modestr=$("#template").html();
		var modestr1=$("#template1").html();
		$(".dttitle").html("我的动态");
		if(result.length==0){$(".dttitle").html("您还没有任何动态");return;}
		$("#dtbox").html("");
		for(var i=0;i<result.length;i++){
			var compile=_.template(modestr);
			var pl=compile(result[i]);
			$(pl).appendTo($("#dtbox"));
			for(var a=0;a<result[i].pinlun.length;a++){
				var compile=_.template(modestr1);
				var pl1=compile(result[i].pinlun[a]);
					$(pl1).appendTo($(".a"+result[i].id));
			}
		}
		$(".sendpl").each(function(index){
			$(this).click(function(){
				var id=$(this).parent().parent().attr("index");
				var info=$(this).prev().val();
				var mainname=localStorage.getItem("weibousername");
				var targetname=$(this).parent().parent().attr("tagname");
				if(!info){return;}
				$.post("/pinlun",{"mainname":mainname,"targetname":targetname,"info":info,"id":id},function(result){
					$(".text").val("");
					init();
				});
			})
		})
	});
}
//分页
function createpage(pagecount){
	var pagenav=document.getElementsByClassName("pagenav")[0];
	$('.pagenav').pagination({//调用的这个方法是用对象去设置参数
		pageCount : pagecount,
		current: 1,
		prevContent:'上一页',
		nextContent:'下一页',
		keepShowPN:false,
		count:11,
		mode:'fixed',
		isHide:false,
		jump:true,
		jumpBtn:'确认',
		callback:function(api){
		var ipt=pagenav.getElementsByTagName('input')[0];
		var btn=pagenav.getElementsByClassName('jump-btn')[0];
		var p1=document.createElement('p');
		p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
		var p2=document.createElement('p');
		p2.innerHTML='&nbsp;页';
		pagenav.insertBefore(p1,ipt);
		pagenav.insertBefore(p2,btn);
		var page = api.getCurrent();
		update(page);
		$("html,body").animate({"scrollTop":0},300);
		}
	});
	var ipt=pagenav.getElementsByTagName('input')[0];
	var btn=pagenav.getElementsByClassName('jump-btn')[0];
	var p1=document.createElement('p');
	p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
	var p2=document.createElement('p');
	p2.innerHTML='&nbsp;页';
	pagenav.insertBefore(p1,ipt);
	pagenav.insertBefore(p2,btn);
}
(function(){//点击退出
	$("#quit").click(function(){
		localStorage.removeItem("weibousername");
		location.href="index.html";
	})
})();
(function(){//发表
	$(".fb").click(function(){
		var icon=$("#headicon").attr("src");
		var name=localStorage.getItem("weibousername");
		var title=$("#title").val();
		var content=$("#fbtext").val();
		if(!title){$("#helptext").removeClass().addClass("red").html("请完善标题内容");return;}
		else if(!content){$("#helptext").removeClass().addClass("red").html("请完善主体内容");return;}
		else{
			$.post("/fabiao",{"username":name,"title":title,"content":content,"icon":icon},function(result){
				$("#title").val("");
				$("#fbtext").val("");
				$("#helptext").removeClass().addClass("green").html("发表成功");
				setTimeout(function(){$("#helptext").html("");},1500);
				init(1);
			})
		}
	})
})();
//本地裁切图像
var iconx=0;
var icony=0;
var iconw=0;
var imgsrc='';
$(document).ready(function(){//选择图片，获取裁切数据
	$("#file").change(function(){
		var img=this.files[0];
		var r=new FileReader();
		r.readAsDataURL(img);
		r.onload=function(){
			$("#file").hide();
			$("#element_id").attr("src",this.result);
			var jcropApi;
			$('#element_id').Jcrop({
			  allowSelect: true,
			  baseClass: 'jcrop',
			  aspectRatio:1,
			  minSize:[70,70],
			  onSelect:function(){
			  	iconx=parseInt($(".jcrop-holder>div").eq(0).css("left"));
			  	icony=parseInt($(".jcrop-holder>div").eq(0).css("top"));
			  	iconw=parseInt($(".jcrop-holder>div").eq(0).css("width"));
			  	imgsrc=$("#element_id").attr("src");
			  },
			}, function() {
			  jcropApi = this;
			  jcropApi.setSelect([100,100,0,0]);
			});
		}
	})
});
(function(){//点击确定修改头像/用户名/密码
	$("#enter").click(function(){
		if($("#changetx").css("display")!="none"){//更改头像开始
			if(!$("#element_id").attr("src")){
				$("#changeinfo").removeClass().addClass("red").html("请上传头像");
				return;
			}
			$("#changeinfo").removeClass().addClass("blue").html("头像正在上传,请稍等");
			var c=document.createElement("canvas");
			c.width=iconw;
			c.height=iconw;
//			$(c).appendTo($("body"));
			var ctx =c.getContext('2d');
			var img=new Image();
			img.src=imgsrc;
			img.onload=function(){
				ctx.drawImage(img,iconx,icony,iconw,iconw,0,0,iconw,iconw);
				var data = c.toDataURL("image/png");
				data=data.split(',')[1];
				data=window.atob(data);
				var ia = new Uint8Array(data.length);
				for (var i = 0; i < data.length; i++) {ia[i] = data.charCodeAt(i);};
				var blob=new Blob([ia], {type:"image/png"});
				var datas=new FormData();
				datas.append("name",name);
				datas.append("imgs",blob);
				$.ajax({
					type:"post",
					url:"/uploadicon",
					data:datas,
					contentType:false,
					processData:false,
					success:function(result){
						$("#changeinfo").removeClass().addClass("green").html("头像更改成功");
						setTimeout(function(){$(".close-btn").click()},1000);
						result=result.slice(9);
						$.post("/changeicon",{"username":name,"icon":result},function(){
							location.href="personal.html";
						})
					}
				});
			}
		}//更改头像结束
		else if($("#changename").css("display")!="none"){//更改用户名开始
			if(!$("#newname").val()){
				$("#changeinfo").removeClass().addClass("red").html("请输入新用户名");
				return;
			}
			var newname=$("#newname").val();
			if(newname.length<6||newname.length>20){
				$("#changeinfo").removeClass().addClass("red").html("用户名为6-20个字符");
				return;
			}
			$.post("/check",{"username":newname},function(result){
				if(result=="1"){$("#changeinfo").removeClass().addClass("red").html("用户名已存在");}
				else if(result=="0"){
					$("#changeinfo").removeClass().addClass("blue").html("正在修改用户名,请稍等");
					$.post("/changename",{"oldname":name,"newname":newname},function(result){
						$("#changeinfo").removeClass().addClass("green").html("用户名修改成功");
						setTimeout(function(){$(".close-btn").click()},1000);
						localStorage.setItem("weibousername",newname);
						location.href="personal.html";
					});
				}else{console.log(result)}
			})
		}//更改用户名结束
		else if($("#changemima").css("display")!="none"){//更改密码开始
			if(!$("#oldmima").val()){
				$("#changeinfo").removeClass().addClass("red").html("请输入旧密码");
				return;
			}else if(!$("#newmima").val()){
				$("#changeinfo").removeClass().addClass("red").html("请输入新密码");
				return;
			}
			var oldpwd=hex_md5(hex_md5($("#oldmima").val()));
			var newpwd=hex_md5(hex_md5($("#newmima").val()));
			$.post("/checkpwd",{"username":name,"password":oldpwd},function(result){
				if(result=="1"){
					$.post("/changemima",{"username":name,"password":newpwd},function(result){
						$("#changeinfo").removeClass().addClass("green").html("密码修改成功");
						setTimeout(function(){$(".close-btn").click()},1000);
					})
				}else{$("#changeinfo").removeClass().addClass("red").html("旧密码错误");}
			})
		}//更改密码结束
	})
})();
(function(){//修改密码
	$("#oldmima").blur(function(){//旧密码
		var mima=$("#oldmima").val();
		var pwd=hex_md5(hex_md5(mima));
		if(!mima){
			$("#changeinfo").removeClass().addClass("red").html("旧密码为空");
			return;
		}
		$.post("/checkpwd",{"username":name,"password":pwd},function(result){
			if(result=="1"){
				$("#changeinfo").removeClass().addClass("blue").html("旧密码正确");
			}else{
				$("#changeinfo").removeClass().addClass("red").html("旧密码错误");
			}
		})
	});
	$("#newmima").blur(function(){//新密码
		var mima=$("#newmima").val();
		var pwd=pwd=hex_md5(hex_md5(mima));
		if(!mima){
			$("#changeinfo").removeClass().addClass("red").html("新密码为空");
			return;
		}else if(mima.length<6||mima.length>20){
			$("#changeinfo").removeClass().addClass("red").html("密码为6-20位字符");
		}else{$("#changeinfo").removeClass().addClass("green").html("密码格式正确");}
	});
})();
(function(){//修改头像按钮
	$("#touxiang").click(function(){
		$("#modal").modal({show:true,});
		$("#changeinfo").html($("#touxiang").html());
		$("#changetx").show().siblings().hide();
	})
})();
(function(){//修改用户名
	$("#yonhuming").click(function(){
		$("#modal").modal({show:true,});
		$("#changeinfo").html($("#yonhuming").html());
		$("#changename").show().siblings().hide();
	})
})();
(function(){//修改密码
	$("#mima").click(function(){
		$("#modal").modal({show:true,});
		$("#changeinfo").html($("#mima").html());
		$("#changemima").show().siblings().hide();
	})
})();
function compare(obj1, obj2) {//排序
    var val1 = parseInt(obj1.id);
    var val2 = parseInt(obj2.id);
    return val1-val2;
}