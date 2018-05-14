window.onload=function(){
	//获取模板
	var goodsli="<li><img src='<%=goods_thumb%>'><h1><%=goods_name%></h1><h2></h2><h3>¥<%=price%></h3></li>";
	var goodslis="<li><img src='<%=goods_thumb%>'><h1><%=goods_name%></h1><h2><%=goods_number%></h2><h3>¥<%=goods_price%></h3></li>";
	var tabbox=document.getElementsByClassName("tabdd")[0];
	//同步获取数据
	var zonger=document.getElementById("zonger");
	var reurl=/([\d]*)/g;
	var url=location.search;
	var str=url.match(reurl);
	var str1=[];
	for(var a=0;a<str.length;a++){if(str[a]!=''){str1.push(str[a]);}};
	if(url){//直接从商品详情点击立即购买
		$.ajax({
			url:'http://h6.duchengjiu.top/shop/api_goods.php',
			type:'get',
			async:false,
			data:{"goods_id":str1[0]},
			success:function(data){
				var obj=data.data[0];
				var compile =_.template(goodsli);
				tabbox.innerHTML+=compile(obj);
				var num=tabbox.getElementsByTagName("h2")[0];
				num.innerHTML=str1[1];
				var price=str1[1]*parseFloat(obj.price);
				zonger.innerHTML=price%1==0?price+".00":price;
			}
		});
	}else{//从购物车进付款页面
		var price=0;
		$.ajax({
			url:'http://h6.duchengjiu.top/shop/api_cart.php',
			type:'get',
			async:false,
			data:{"token":localStorage.getItem("token")},
			success:function(data){
				var obj=data.data;
				for(var i=0;i<obj.length;i++){
					var compile =_.template(goodslis);
					tabbox.innerHTML+=compile(obj[i]);
					price+=parseFloat(obj[i].goods_price);
				}
				zonger.innerHTML=price%1==0?price+".00":price;
			}
		});
	}
}
