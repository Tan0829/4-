window.onload=function(){
	var navul=document.getElementById('shopnav');
	shop.onmouseout=function(){shop.style.borderBottom="4px solid #25292e";};
	shopbox.onmouseout=function(){shop.style.borderBottom="4px solid #25292e";};
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(data){
		var obj=data.data;
		for(var i=0;i<obj.length;i++){
			var li=document.createElement('li');
			var a=document.createElement('a');
			a.href="allgoods.html?cat_id="+obj[i].cat_id;
			a.innerHTML=obj[i].cat_name;
			li.appendChild(a);
			navul.appendChild(li);
		}
		var nli=document.getElementById('shopnav').getElementsByTagName('li');
		var nline=document.getElementById('nline');
		var price=document.getElementById('price');
		for(var a=0;a<nli.length;a++){
			nli[a].index=a;
			nli[a].onmouseover=function(){
				nline.style.width=fetchComputedStyle(this,'width')+'px';
				var toleft=this.offsetLeft;
				nline.style.opacity='1';
				nline.style.transform='translate('+toleft+'px,0px)';
			}
			nli[a].onmouseout=function(){nline.style.opacity='0';}
		}
	});
	//外部数据
	var contbox=document.getElementById('goodslist');
	var str=document.getElementById('div').innerHTML;
	$.get('http://h6.duchengjiu.top/shop/api_goods.php',{"page":3,"pagesize":25},function(data){
		var obj=data.data;
		var compile=_.template(str);
		for(var i=0;i<obj.length;i++){
			contbox.innerHTML+=compile(obj[i]);
		}
		var all=contbox.getElementsByClassName('box');
		all[7].style.float='right';
		all[16].style.float='right';
		for(var x=0;x<all.length;x++){
			var oimg=all[x].querySelector('img');
			var odiv=all[x].getElementsByTagName('div')[0];
			var oa=all[x].getElementsByTagName('a')[0];
			if(x==0||x==7||x==10||x==16||x==20){
				all[x].style.width='490px';
				all[x].style.height='490px';
				oimg.style.width='490px';
				oimg.style.height='490px';
				odiv.style.width='490px';
				odiv.style.height='450px';
				oa.style.paddingTop='130px';
				oa.style.width='490px';
				oa.style.height='360px';
			}else if(x==1||x==2||x==3||x==4||x==11||x==12||x==13||x==14||x==21||x==22||x==23||x==24){
				all[x].style.marginLeft='20px';
			}else{all[x].style.marginRight='20px';}
		}
	});
}
