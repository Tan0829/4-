//计算后样式
function fetchComputedStyle(ele,pro){
	if(window.getComputedStyle){
		return parseFloat(getComputedStyle(ele)[pro]);
	}else{return parseFloat(ele.currentStyle[pro]);}
}
//运动框架
function animate(obj,tagJSON,time,tween,callback){
	//上锁
	obj.locker=true;
	//判断必须的三个参数是否正确
	if(arguments.length==3){tween='linear';callback=null;}//只有3个参数，默认匀速运动，回调为空
	if(typeof arguments[0]!='object' || typeof arguments[1] !='object' || typeof arguments[2]!='number'){
		throw new Error('参数类型有误');
	}else if(arguments.length==4 && typeof arguments[3]=='function'){//判断运动方式
			callback=arguments[3];
			tween='linear';
	}
	//判断浏览器运动最小时间间隔,高级为10ms，低级为50ms
	var interval = window.navigator.userAgent.indexOf("MSIE") == -1 ? 10 : 50;
	//起始JSON
	var startJSON={};
	for(var k in tagJSON){startJSON[k]=fetchComputedStyle(obj,k);}
	//过程JSON
	var moveJSON={};
	for(var k in tagJSON){
		tagJSON[k]=parseFloat(tagJSON[k]);
		moveJSON[k]=tagJSON[k]-startJSON[k];
	}
	//总次数
	var maxcount=parseInt(time/interval);
	//开始运动
	var count=0;
	var timer;
	timer=setInterval(function(){
		count++;
		for(var k in tagJSON){
			if(k=='opacity'){//变换透明度
				obj.style[k]=Tween[tween](count,startJSON[k],moveJSON[k],maxcount);
				obj.style.filter='alpha(opacity='+Tween[tween](count,startJSON[k],moveJSON[k],maxcount)*100+')';
			}else{
				obj.style[k]=Tween[tween](count,startJSON[k],moveJSON[k],maxcount)+'px';
			}
		}
		if(count==maxcount){//停止条件
			clearInterval(timer);
			for(var k in tagJSON){
				if(k=='opacity'){
					obj.style[k]=tagJSON[k];
					obj.style.filter='alpha(opacity='+tagJSON[k]*100+')';
				}else{
					obj.style[k]=tagJSON[k]+'px';
				}
			}
			callback && callback.call(obj);
			//解锁
			obj.locker=false;
		}
	},interval);
}



//缓冲计算公式（方法）
var Tween = {
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    quadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    quadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    quadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    qubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    qubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    qubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    sineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    sineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    sineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    expoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    expoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    expoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    circEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    circEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    elasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    elasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    backEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backEaseOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    bounceEaseIn: function(t, b, c, d) {
        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
    },
    bounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    bounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}

//元素到浏览器边的距离
function getAll(obj){
	var aAll=[];
	aAll[0]=obj.offsetLeft;
	aAll[1]=obj.offsetTop;
	while(obj=obj.offsetParent){
		aAll[0]+=obj.offsetLeft;
		aAll[1]+=obj.offsetTop;
	}
	return aAll;
}

//监听鼠标滚轮
function mouseWheel(event){
	var direction=0;
	event=event||window.event;
	if(event.preventDefault){event.preventDefault();}
	else{event.returnValue=false;}
	if(event.wheelDelta){
		direction=(event.wheelDelta<0)?-1:1;
	}else{direction=(event.detail<0)?1:-1;}
	console.log(direction);
	return direction;
}