window.onload=function(){
	//中间导航效果
	shop.onmouseout=function(){shop.style.borderBottom="4px solid #25292e";};
	shopbox.onmouseout=function(){shop.style.borderBottom="4px solid #25292e";};
	var geturl=window.location.search;
	var reurl=/(\d*)/g;
	var catid=parseInt(geturl.match(reurl).join(''));
	getdata(1,catid);
	var nowcat=0;
	var navul=document.getElementById('shopnav');
	var webnav=document.getElementById('webnav');
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(data){
		var obj=data.data;
		for(var i=0;i<obj.length;i++){
			var li=document.createElement('li');
			var a=document.createElement('a');
			a.href="allgoods.html?cat_id="+obj[i].cat_id;
			a.innerHTML=obj[i].cat_name;
			li.appendChild(a);
			navul.appendChild(li);
			if(catid==obj[i].cat_id){
				nowcat=li.offsetLeft;
				var newspan=document.createElement('span');
				newspan.innerHTML="&gt;&nbsp;"+obj[i].cat_name;
				webnav.appendChild(newspan);
			}
		}
		var nli=document.getElementById('shopnav').getElementsByTagName('li');
		var nline=document.getElementById('nline');
		var price=document.getElementById('price');
		nline.style.transform='translate('+nowcat+'px,0px)';
		for(var a=0;a<nli.length;a++){
			nli[a].index=a;
			nli[a].onmouseover=function(){
//				nline.style.width=fetchComputedStyle(this,'width')+'px';
				var toleft=this.offsetLeft;
				nline.style.opacity='1';
				nline.style.transform='translate('+toleft+'px,0px)';
			}
			nli[a].onmouseout=function(){nline.style.transform='translate('+nowcat+'px,0px)';}
		}
	});
	getdata(1,catid);
	//动态获取数据
	var part2=document.getElementById('part2');
	var template = document.getElementById('template');
	var str = template.innerHTML;
	var pagenum=0;
	$.ajax({
  		url: "http://h6.duchengjiu.top/shop/api_goods.php",
  		data: {'page':1,'pagesize':18,"cat_id":catid},
 		async:false,
 		dataType:'json',
 		success: function(data){pagenum=data.page.page_count;}
	});
	function getdata(page,catid){
		$.get("http://h6.duchengjiu.top/shop/api_goods.php",{'page':page,'pagesize':18,"cat_id":catid},function(data){
			part2.innerHTML='';
			var obj=data.data;
			for(var i=0;i<obj.length;i++){
				var compile =_.template(str);
				part2.innerHTML+=compile(obj[i]);
			}
			var aLi=part2.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				if((i+1)%3==0){aLi[i].style.margin='32px 0 0 0';}
			}
			//点击点赞效果
			$(".dianzan").click(function(){$(this).children("p").toggle()});
		});
	};
	//创建分页栏
	var part2box=document.getElementById('part2box');
	var page=document.createElement('div');
	page.className='page';
	part2box.appendChild(page);
	$('.page').pagination({//调用的这个方法是用对象去设置参数
		pageCount : pagenum,
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
		var ipt=page.getElementsByTagName('input')[0];
		var btn=page.getElementsByClassName('jump-btn')[0];
		var p1=document.createElement('p');
		p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
		var p2=document.createElement('p');
		p2.innerHTML='&nbsp;页';
		page.insertBefore(p1,ipt);
		page.insertBefore(p2,btn);
		getdata(api.getCurrent());
		}
	});
	var ipt=page.getElementsByTagName('input')[0];
	var btn=page.getElementsByClassName('jump-btn')[0];
	var p1=document.createElement('p');
	p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
	var p2=document.createElement('p');
	p2.innerHTML='&nbsp;页';
	page.insertBefore(p1,ipt);
	page.insertBefore(p2,btn);
}
