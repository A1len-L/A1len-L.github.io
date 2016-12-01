$(function(){
	/*加载最上面部分*/
	$(".addhead").load("head.html",function(){
		$.getScript("js/head.js");
	})
	/*放大镜*/
	var biger={
		small:$("#main .exhibition .bigger .small"),
		big:$("#main .exhibition .bigger .big"),
		filter:$("#main .exhibition .bigger .small .filter"),
		bigimg:$("#main .exhibition .bigger .big img"),
		smallt:$("#main .exhibition .bigger .small").offset().top,
		smalll:$("#main .exhibition .bigger .small").offset().left,
		init:function(){
			this.move();
		},
		move:function(){
			var that=this;
			this.small.mousemove(function(e){
				var t=e.pageY;
				var l=e.pageX;
				var left=l-that.smalll-100;
				var top=t-that.smallt-100;
				left=left>180?180:left<0?0:left;
				top=top>180?180:top<0?0:top;
				that.filter.css({
					left:left,
					top:top
				})
				that.bigimg.css({
					marginLeft:-2*left,
					marginTop:-2*top
				})
			})
		}
	}
	biger.init();
})
