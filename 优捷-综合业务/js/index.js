window.onload=function(){
	//轮播图获取数据
	var mode=$("#mode").html();
	$.ajax({
		url:'http://h6.duchengjiu.top/shop/api_position.php',
		type:'get',
		async:false,
		success:function(data){
			var ad_id=data.data[0].position_id;
			$.ajax({
				url:'http://h6.duchengjiu.top/shop/api_ad.php',
				data:{"position_id":ad_id},
				async:false,
				success:function(data){
					var obj=data.data;
					for(var i=0;i<obj.length;i++){
						var compile=_.template(mode);
						$("#lbt").append(compile(obj[i]));
						$("#btline").append($("<li></li>"));
						$("#btline li").eq(i).attr("index",i);
					}
					$("#lbt").css("width",1000*obj.length);
				}
			});
		}
	});
	var count=0;
	$("#btline li:first").css("background","#45494d");
	var timer=setInterval(move,5000);
	$("#blp").click(function(){//点击上一张
		if($("#lbt").is(":animated")){return;}
		else{premove();}
		
	});
	$("#brp").click(function(){//点击下一张
		if($("#lbt").is(":animated")){return;}
		else{move();}
	});
	//点击下方方块跳转
	$("#btline li").click(function(){
		var dir=$(this).attr("index")-count;
		if(dir>0){
			for(var a=0;a<dir;a++){move();}
		}else if(dir<0){
			for(var b=0;b<Math.abs(dir);b++){premove();}
		}
	});
	function move(){//下一张运动方法
		clearInterval(timer);
		count++;
		if(count>7){count=0};
		$("#btline li").eq(count).css("background","#45494d").siblings().css("background","#e8e8e8");
		$("#lbt").stop().animate({"left":-1000},300,function(){
			$("#lbt li:first").appendTo($("#lbt"));
			$("#lbt").css("left",0);
		});
		timer=setInterval(move,5000);
		
	}
	function premove(){//上一张运动方法
		clearInterval(timer);
		count--;
		if(count<0){count=7};
		$("#btline li").eq(count).css("background","#45494d").siblings().css("background","#e8e8e8");
		$("#lbt").css("left",-1000);
		$("#lbt li:last").insertBefore($("#lbt li:first"));
		$("#lbt").stop().animate({"left":0},300,function(){
			$("#lbt").css("left",0);
		});
		timer=setInterval(move,5000);console.log(count);
	}

	//获取商品数据
	var part2=document.getElementById('part2');
	var template = document.getElementById('template');
	var str = template.innerHTML;
	var nowpage=1;
	var allpage=0;
	function getdata(page){
		$.get("http://h6.duchengjiu.top/shop/api_goods.php",{'page':page,'pagesize':18},function(data){
			var obj=data.data;
			allpage=data.page.page_count;
			for(var i=0;i<obj.length;i++){
				var compile = _.template(str);
				part2.innerHTML+=compile(obj[i]);
			}
			var aLi=part2.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				if((i+1)%3==0){aLi[i].style.margin='32px 0 0 0';}
			}
			//点击点赞效果
			$(".dianzan").click(function(){$(this).children("p").toggle()});
		});
	}
	getdata(nowpage);
	//点击more加载更多
	var more=document.getElementById('more');
	more.onclick=function(){
		if(nowpage>allpage){return;}
		else{getdata(++nowpage);}
	}
	
}
