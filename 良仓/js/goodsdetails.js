window.onload=function(){
	//获取商品数据
	var div1=document.getElementById("div1").innerHTML;//获取模板字符串
	var main=document.getElementById("main");//获取插入点
	var reurl=/(\d*)/g;
	var url=location.search;
	var goodsid=parseInt(url.match(reurl).join(''));
	$.ajax({
		url:'http://h6.duchengjiu.top/shop/api_goods.php',
		type:'get',
		async:false,
		data:{"goods_id":goodsid},
		success:function(data){
			var obj=data.data[0];
			var compile = _.template(div1);
			main.innerHTML+=compile(obj);
		}
	});
	//右边广告
	var div2=document.getElementById("div2").innerHTML;
	var div3=document.getElementById("div3").innerHTML;
	main.innerHTML+=div2;
	var rightad=document.getElementById("rightad");
	var getul=rightad.getElementsByTagName("ul")[0];
	$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"page":10,"pagesize":4},function(data){
		var obj=data.data;
		for(var i=0;i<obj.length;i++){
			var compile = _.template(div3);
			getul.innerHTML+=compile(obj[i]);
		}
	});
//轮播图
	var det=document.getElementById('det');
	var adet=det.getElementsByTagName('li');
	var deb=document.getElementById('deb');
	var adeb=deb.getElementsByTagName('li');
	var pre=document.getElementById('pre');
	var next=document.getElementById('next');
	var b=0;
	for(var a=0;a<adet.length;a++){
		adet[a].index=a;
		adeb[a].index=a;
		adeb[a].onclick=function(){
			b=adeb[this.index].index;
			det.style.transform='translate('+-b*350+'px,0px)';
			for(var c=0;c<adeb.length;c++){
				adeb[c].style.border='none';
			}
			adeb[b].style.border='1px solid black';
		}
	}
	setInterval(function(){
		for(var c=0;c<adeb.length;c++){
			adeb[c].style.border='none';
			if(b==c){
				adeb[c].style.border='1px solid black';
			}
		}
	},100);
	var timer;
	function move(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			b++;
			if(b>4){b=0};
			det.style.transform='translate('+-b*350+'px,0px)';
		move();
		},4000);
	}move();
	pre.onclick=function(){
		clearTimeout(timer);
		b--;
		if(b<0){b=4;}
		det.style.transform='translate('+-b*350+'px,0px)';
		move();
	}
	next.onclick=function(){
		clearTimeout(timer);
		b++;
		if(b>4){b=0;}
		det.style.transform='translate('+-b*350+'px,0px)';
		move();
	}
	//加减
	var red=document.getElementById('red');
	var sl=document.getElementById('sl');
	var add=document.getElementById('add');
	var getnum=parseInt(sl.innerHTML);
	red.onclick=function(){
		getnum--;
		if(getnum<=1){getnum=1;}
		sl.innerHTML=getnum;
	}
	add.onclick=function(){
		getnum++;
		sl.innerHTML=getnum;
	}
	//立即购买
	var buynow=document.getElementById("buynow");
		buynow.onclick=function(){
			var iflogin=localStorage.getItem("token");
			var goodsnum=parseInt(sl.innerHTML);
			if(iflogin){
				$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+iflogin,{"goods_id":goodsid,"number":goodsnum},function(data){
					infoupdata();
				});
				window.location.href="pay.html?goods_id="+goodsid+"&goods_number="+sl.innerHTML;
			}
			else{loginbg.style.display="block";}
		};
	//加入购物车
	var gwc=document.getElementById('gwc');
	gwc.onclick=function(){
		var iflogin=localStorage.getItem("token");
		var goodsnum=parseInt(sl.innerHTML);
		if(iflogin){
			$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+iflogin,{"goods_id":goodsid,"number":goodsnum},function(data){
				errinfo.innerHTML='加入购物车成功';console.log(data);
				error.style.display="block";
				loginbg.style.display="block";
				loginbox.style.display="none";
				infoupdata();
				setTimeout(function(){error.style.display='none';loginbg.style.display="none";},1000);
			});
		}else{loginbg.style.display="block";}
	}
	//分享
	var fx=document.getElementById("fx");
	var fxbox="<p>你可以通过以下方式分享：</p><h1><img src='images/qq_09.png'><img src='images/qq_03.png'><img src='images/qq_05.png'><img src='images/qq_07.png'></h1>";
	fx.onclick=function(){
		errinfo.innerHTML=fxbox;
		error.style.display="block";
		loginbg.style.display="block";
		loginbox.style.display="none";
	}
}
