window.onload=function(){
	//同步获取数据
	var token=localStorage.getItem("token");
	var list=document.getElementById("list").innerHTML;//模板数据
	var allgoods=document.getElementById("allgoods");
	var empty=document.getElementById("empty").innerHTML;
	var goodsallprice=document.getElementById('goodsallprice');//总价
	$.ajax({
		url:'http://h6.duchengjiu.top/shop/api_cart.php',
		type:'get',
		async:false,
		data:{"token":token},
		success:function(data){
			var obj=data.data;
			for(var i=0;i<obj.length;i++){
				var compile =_.template(list);
				allgoods.innerHTML+=compile(obj[i]);
			}
		}
	});
	if(allgoods.innerHTML==''){allgoods.innerHTML=empty;}//购物车为空，显示empty
	var aGoods=allgoods.getElementsByTagName('li');
	var minus=allgoods.getElementsByTagName('h1');
	var num=allgoods.getElementsByTagName('h2');
	var add=allgoods.getElementsByTagName('h3');
	var oneprice=allgoods.getElementsByTagName('h4');
	var allprice=allgoods.getElementsByTagName('h5');
	var dele=allgoods.getElementsByTagName('h6');
	var allsel=allgoods.getElementsByTagName('input');
	var all=document.getElementById('all');
	var getid=allgoods.getElementsByTagName('span');
	all.checked=true;
	if(allgoods.innerHTML!=empty){
		for(var i=0;i<aGoods.length;i++){
			var price=parseFloat(num[i].innerHTML)*parseFloat(oneprice[i].innerHTML);
			allprice[i].innerHTML=price%1==0?price+".00":price;
			minus[i].index=i;
			add[i].index=i;
			dele[i].index=i;
			allsel[i].checked=true;
			//减少商品
			minus[i].onclick=function(){
				var goodsnum=parseInt(num[this.index].innerHTML);
				goodsnum--;
				if(goodsnum<1){num[this.index].innerHTML=1;return;}
				else{
					num[this.index].innerHTML=goodsnum;
					updata(token,getid[this.index].innerHTML,goodsnum);
					getallprice();
					infoupdata();
				}
			}
			//添加商品
			add[i].onclick=function(){
				var goodsnum=parseInt(num[this.index].innerHTML);
				goodsnum++;
				if(goodsnum>50){num[this.index].innerHTML=50;return;}
				else{
					num[this.index].innerHTML=goodsnum;
					updata(token,getid[this.index].innerHTML,goodsnum);
					getallprice();
					infoupdata();
				}
			}
			allsel[i].onclick=function(){getallprice();}//单选
			//删除
			dele[i].onclick=function(){
				updata(token,getid[this.index].innerHTML,0);
				aGoods[this.index].style.display="none";
				allsel[this.index].checked=false;
				getallprice();
				infoupdata();
				if(allgoods.clientHeight==0){allgoods.innerHTML=empty;goodsnum.style.display="none";}
			}
		}
	}else{return;}
	
	//全选按钮
	var x=false;
	all.onclick=function(){
		if(!all.checked){x=false;}
		else{x=true;}
		for(var i=0;i<aGoods.length;i++){
			allsel[i].checked=x;
		}
		getallprice();
	}
	//算总价的方法
	function getallprice(){
		var getprice=0;
		for(var i=0;i<aGoods.length;i++){
			var price=parseFloat(num[i].innerHTML)*parseFloat(oneprice[i].innerHTML);
			allprice[i].innerHTML=price%1==0?price+".00":price;
			if(allsel[i].checked){getprice+=parseFloat(price);}
		}// && aGoods[i].style.display=="block"
		getprice=getprice%1==0?"¥"+getprice+".00":"¥"+getprice;
		goodsallprice.innerHTML=getprice;
	};
	getallprice();
	function updata(token,goodsid,goodsnum){
		$.ajax({
			url:'http://h6.duchengjiu.top/shop/api_cart.php?token='+token,
			type:'post',
			async:false,
			data:{"goods_id":goodsid,"number":goodsnum},
			success:function(data){console.log(data);}
		});
	};
}
