window.onload=function(){
	
	//轮播图获取图片
	var oLbt=document.getElementById('lbt');
	var oLine=document.getElementById('btline');
	var ad_id=0;
	$.ajax({
		url:'http://h6.duchengjiu.top/shop/api_position.php',
		type:'get',
		async:false,
		success:function(data){
			ad_id=data.data[0].position_id;
			$.get('http://h6.duchengjiu.top/shop/api_ad.php',{"position_id":ad_id},function(data){
				var obj=data.data;
				for(var i=0;i<obj.length;i++){
					var li=document.createElement('li');
					var a=document.createElement('a');
					var img=document.createElement('img');
					img.src=obj[i].url;
					a.appendChild(img);
					a.href=obj[i].thumb;
					li.appendChild(a);
					oLbt.appendChild(li);
					oLine.appendChild(document.createElement('li'));
					$("[lazyLoadSrc]").YdxLazyLoad();
				}
				var aLbt=oLbt.getElementsByTagName('li');
				var aLine=oLine.getElementsByTagName('li');
				var oLeft=document.getElementById('blp');//左箭头
				var oRight=document.getElementById('brp');//右箭头
				var lth=aLbt.length;
				oLbt.style.width=lth*1000+'px';
				//轮播效果
				var timer;
				var timer1;
				var timer2;
				var timer3;
				var timer4;
				var timer5;
				var left;
				for(var a=0;a<aLbt.length;a++){
					aLbt[a].index=a;
					aLine[a].index=a;
				}
				oLbt.insertBefore(aLbt[lth-1],aLbt[0]);
				function move(){
					clearTimeout(timer5);
					timer5=setTimeout(function(){
						left=1000;
						clearInterval(timer);
						timer=setInterval(function(){
							left+=40;
							oLbt.style.left=-left+'px';
							if(left>=2000){
								clearInterval(timer);
								oLbt.style.left='-1000px';
								oLbt.appendChild(aLbt[0]);
								left=1000;
							}
						},10);
						move();
					},5000);
				}
				move();
				//上一张
				var locker=true;
				oLeft.onclick=function(){
					if(!locker){return;}
					locker=false;
					var count=0;
					var left=-2000;
					clearTimeout(timer5);
					clearInterval(timer1);
					timer1=setInterval(function(){
						count++;
						left+=40;
						oLbt.style.left=left+'px';
						if(count==25){clearInterval(timer1);}
					},10);
					oLbt.insertBefore(aLbt[lth-1],aLbt[0]);
					setTimeout(function(){locker=true;},500);
					move();
				}
					//下一张
				oRight.onclick=function(){
					if(!locker){return;}
					locker=false;
					var count=0;
					var left=0;
					clearTimeout(timer5);
					clearInterval(timer1);
					timer2=setInterval(function(){
						count++;
						left+=40;
						oLbt.style.left=-left+'px';
						if(count==25){clearInterval(timer2);}
					},10);
					oLbt.appendChild(aLbt[0]);
					setTimeout(function(){locker=true;},500);
					move();
				}
				//小方块点击
				for(var a=0;a<aLbt.length;a++){
					aLbt[a].onclick=function(){window.location.href='goodsdetails.html'}
					aLine[a].onclick=function(){
						clearTimeout(timer5);
						clearInterval(timer3);
						var thisli;
						thisli=aLbt[1].index;//获取当前图片下标
						var num=aLine[this.index].index-thisli;
						var i=0;
						jump(num,i);
						move();
					}
				}
				function jump(num,i){
					clearInterval(timer4);
					if(num>=0){
						var left=0;
						timer4=setInterval(function(){
							if(i>=num){clearInterval(timer4);}
							else{
								left+=40*num;
								oLbt.style.left=-left+'px';
								if(left>=1000){
									left=0;
									i++;
									oLbt.appendChild(aLbt[0]);
									oLbt.style.left='-1000px';
								}
							}
						},10);
					}else{
						var left=0;
						num=Math.abs(num);
						timer4=setInterval(function(){
							if(i>=num){clearInterval(timer4);}
							else{
								left+=40*num;
								oLbt.style.left=left+'px';
								if(left>=1000){
									left=0;
									i++;
									oLbt.insertBefore(aLbt[lth-1],aLbt[0]);
									oLbt.style.left='-1000px';
								}
							}
						},10);
					}
				}
				//小方块随动
				setInterval(function(){
					var thisli=aLbt[1].index;
					for(var b=0;b<aLbt.length;b++){
						if(aLine[b].index==thisli){
							aLine[b].style.background='#45494d';
						}else{
						aLine[b].style.background='#e8e8e8';
						}
					}
				},100);
			})
		}
	});
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
