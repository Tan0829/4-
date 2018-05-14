window.onload=function(){
	var url=decodeURI(location.search);//获取关键字decodeURI()
	var getkey=url.substr(13);
	var modeli=document.getElementById("goodsli").innerHTML;//获取模板
	var goodsbox=document.getElementById("goodsbox");
	var searchnum=document.getElementById("searchnum");
	var searchkey=document.getElementById("searchkey");
	searchkey.innerHTML=getkey;
	$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"search_text":getkey,"page":1,"pagesize":40},function(data){
		var obj=data.data;console.log(obj,data);
		for(var i=0;i<obj.length;i++){//添加元素
			var compile=_.template(modeli);
			goodsbox.innerHTML+=compile(obj[i]);
		}
		searchnum.innerHTML=obj.length;
		var getli=goodsbox.getElementsByTagName("li");
		var goodsidbox=goodsbox.getElementsByClassName("goodsid");
		var cart=goodsbox.getElementsByClassName("addintocart");
		for(var i=0;i<getli.length;i++){
			goodsidbox[i].index=i;
			cart[i].index=i;
			if((i+1)%4==0){getli[i].style.margin="0px";}
			cart[i].onclick=function(){
				var iflogin=localStorage.getItem("token");
				if(iflogin){
					$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+iflogin,{"goods_id":goodsidbox[this.index].innerHTML,"number":1},function(data){
						errinfo.innerHTML='加入购物车成功';console.log(data);
						error.style.display="block";
						loginbg.style.display="block";
						loginbox.style.display="none";
						infoupdata();
						setTimeout(function(){error.style.display='none';loginbg.style.display="none";},1000);
					});
				}else{loginbg.style.display="block";}
			}
		}
		//创建分页
//		var pagebox=document.getElementById('pagebox');
//		var page=document.createElement('div');
//		page.className='page';
//		pagebox.appendChild(page);
//		$('.page').pagination({//调用的这个方法是用对象去设置参数
//			pageCount : 10,
//			current: 1,
//			prevContent:'上一页',
//			nextContent:'下一页',
//			keepShowPN:false,
//			count:11,
//			mode:'fixed',
//			isHide:false,
//			jump:true,
//			jumpBtn:'确认',
//			callback:function(api){
//			var ipt=page.getElementsByTagName('input')[0];
//			var btn=page.getElementsByClassName('jump-btn')[0];
//			var p1=document.createElement('p');
//			p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
//			var p2=document.createElement('p');
//			p2.innerHTML='&nbsp;页';
//			page.insertBefore(p1,ipt);
//			page.insertBefore(p2,btn);
//			getdata(api.getCurrent());
//			}
//		});
//		var ipt=page.getElementsByTagName('input')[0];
//		var btn=page.getElementsByClassName('jump-btn')[0];
//		var p1=document.createElement('p');
//		p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
//		var p2=document.createElement('p');
//		p2.innerHTML='&nbsp;页';
//		page.insertBefore(p1,ipt);
//		page.insertBefore(p2,btn);
	});
}
