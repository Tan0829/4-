var name=localStorage.getItem("weibousername");
if(name=="null"){location.href="index.html";}
function init(page){//初始化,获取用户名，图片
	$("#getusername").html("欢迎！ "+name);
	$.post("/finduser",{},function(result){
		var modestr2=$("#template2").html();
		$(".listbox").html("");
		for(var i=0;i<result.length;i++){
			var compile=_.template(modestr2);
			var pl=compile(result[i]);
			$(pl).appendTo($(".listbox"));
		}
	});
	$.post("/findfball",{},function(result){
		var allfb=result;
		var userfb=allfb.sort(compare);//排序后的所有发表数据
		var modestr=$("#template").html();
		$("#dtbox").html("");
		for(var c=0;c<userfb.length;c++){
			var compile=_.template(modestr);
			var pl=compile(userfb[c]);
			$(pl).appendTo($("#dtbox"));
			var modestr1=$("#template1").html();
			for(var d=0;d<userfb[c].pinlun.length;d++){
				var compile=_.template(modestr1);
				var pl1=compile(userfb[c].pinlun[d]);
				$(pl1).appendTo($(".a"+userfb[c].id));
			}
		}
		$.post("/countall",{},function(result){
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
	})
	
		
	
};
init(1);
function update(page){
	$.post("/findfball",{"page":page},function(result){
		var allfb=result;
		var userfb=allfb.sort(compare);//排序后的所有发表数据
		var modestr=$("#template").html();
		$("#dtbox").html("");
		for(var c=0;c<userfb.length;c++){
			var compile=_.template(modestr);
			var pl=compile(userfb[c]);
			$(pl).appendTo($("#dtbox"));
			var modestr1=$("#template1").html();
			for(var d=0;d<userfb[c].pinlun.length;d++){
				var compile=_.template(modestr1);
				var pl1=compile(userfb[c].pinlun[d]);
				$(pl1).appendTo($(".a"+userfb[c].id));
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
					init(1);
				});
			})
		})
	})
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
//排序方法
function compare(obj1, obj2) {
    var val1 = parseInt(obj1.id);
    var val2 = parseInt(obj2.id);
    return val2-val1;
}
//无操作默认刷新页面
var timer=null;
function autorefresh(){
	clearInterval(timer);
	timer=setInterval(function(){
		window.onscroll=function(){clearInterval(timer);autorefresh()};
		$(window).mousemove(function(){clearInterval(timer);autorefresh()});
		$(window).mousedown(function(){clearInterval(timer);autorefresh()});
		$(window).keydown(function(){clearInterval(timer);autorefresh()})
		init(1);
		$("html,body").animate({"scrollTop":0},300);
	},15000);
}
autorefresh();


