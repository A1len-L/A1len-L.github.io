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
		exhibitionlist:$("#main .exhibition .exhibitionlist"),
		smallimgs:$("#main .exhibition .bigger .small img"),
		init:function(){
			this.move();
			this.click();
			this.hover();
		},
		//放大功能
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
		},
		//点击切换小展示区图片
		click:function(){
			var that=this;
			var next=0;
			var now=0;
			this.exhibitionlist.on("click","li",function(){
				//切换大展示区图片
				next=$(this).index();
				if(now==next){
					return;
				}
				that.smallimgs.eq(now).stop(true).fadeOut();
				that.smallimgs.eq(next).stop(true).fadeIn();
				now=next;
				//切换放大区图片
				var src=$(this).find("img").attr("src");
				that.bigimg.attr("src",src)
			})
		},
		//显示与隐藏放大区图片
		hover:function(){
			var that=this;
			this.small.hover(function(){
				that.filter.stop(true).show();
				that.big.stop(true).show(500);
			},function(){
				that.filter.stop(true).hide();
				that.big.stop(true).hide(500);
			})
		}
	}
	biger.init();
	//购物车操作
	var cart={
		gid:$("#main").data("gid"),
		colorBox:$("#main .productinformation .productdes .item .content2 "),
		numInput:$("#main .productinformation .productdes .item .content3 input"),
		addbtn:$("#main .productinformation .productdes .item .content3 a.add"),
		decbtn:$("#main .productinformation .productdes .item .content3 a.decrease"),
		cartbtn:$("#main .productinformation .btn span.addcart"),
		data:{},
		init:function(){
			this.initData();
			this.clickColor();
			this.changeCount();
			this.addCart();
		},
		//获取颜色数据
		initData:function (){
			var that=this;
			$.getJSON("json/product.json",function(a){
				that.data=a[that.gid];
				var colorData=that.data.color;
				var colorstr="";
				for(var i=0;i<colorData.length;i++){
					colorstr+='<span class="phonecolor l" data-color="'+colorData[i].id+'">'
							+		'<img src="'+colorData[i].url+'"/>'
							+		'<b>'+colorData[i].des+'</b>'
							+	'</span>'
				};
				that.colorBox.html(colorstr);
				that.colorBox.find("span:eq(0)").addClass("click");
			})
		},
		//点击选取颜色
		clickColor:function(){
			var that=this;
			this.colorBox.on("click","span",function(){
				$(this).addClass("click").siblings().removeClass("click");
			})
		},
		//改变数量
		changeCount:function(){
			var that=this;
			//点击加号
			this.addbtn.click(function(){
				var inputV=parseInt( that.numInput.val() );
				if(inputV>=1493){
					return;
				}
				inputV++;
				that.numInput.val(inputV);
			})
			//点击减号
			this.decbtn.click(function(){
				var inputV=parseInt( that.numInput.val() );
				if(inputV<=1){
					inputV=1;
				}else{
					inputV--;
				}
				that.numInput.val(inputV);
			})
			//直接输入
			this.numInput.on("input",function(){
				//若为空
				if(that.numInput.val().length==0){
					return;
				}
				var inputV=parseInt( that.numInput.val() );
				//判断是不是NAN或0
				if(isNaN(inputV)||inputV==0){
					that.numInput.val(1);
					return;
				}
				//判断是否超库存
				if(inputV>=1493){
					that.numInput.val(1493);
					return;
				}
				that.numInput.val(inputV);
			})
			//失焦判断
			this.numInput.blur(function(){
				if(that.numInput.val().length==0){
					that.numInput.val(1);
				}
			})
		},
		//点击加入购物车
		addCart:function(){
			var that=this;
			this.cartbtn.click(function(){
				var colorId=that.colorBox.find(".click").data("color");
				var amount = parseInt( that.numInput.val() );
				var cookie=$.cookie("iphone")||"{}";
				cookie=JSON.parse(cookie);
				//判断商品是否已经存在
				if(!cookie[colorId]){
					cookie[colorId]={
						goodsId:that.gid,
						colorId:colorId,
						amount:amount
					}
				}else{
						cookie[colorId].amount+=amount;
					}
				//重新写到cookie
				$.cookie("iphone",JSON.stringify(cookie),{expires:365,path: '/'})
				console.log($.cookie("iphone"));
				alert("添加成功！")
			})
		}
	}
	cart.init();
	/*推荐区*/
	var recommend={
		lis:$("#recommend .content ul li"),
		ul:$("#recommend .content ul"),
		btnl:$("#recommend .content a.arrowl"),
		btnr:$("#recommend .content a.arrowr"),
		init:function(){
			this.hover();
			this.click();
		},
		/*li hover*/
		hover:function(){
			var that=this;
			this.lis.hover(function(){
				$(this).stop(true).animate({
					top:-5
				},300).find(".des").stop(true).animate({
					bottom:0
				},300)
			},function(){
				$(this).stop(true).animate({
					top:0
				},300).find(".des").stop(true).animate({
					bottom:-25
				},300)
			})
		},
		//点击左右按钮
		click:function(){
			var that=this;
			var index=0;
			//点击下一张
			this.btnr.click(function(){
				if(index>1){
					return;
				}
				index++;
				that.ul.stop(true).animate({
					marginLeft:-190*index
				})
			})
			//点击上一张
			this.btnl.click(function(){
				if(index<=0){
					return;
				}
				index--;
				that.ul.stop(true).animate({
					marginLeft:-190*index
				})
			})
		}
	}
	recommend.init();
	
	/*推荐区下部*/
	
	//点击title 的li
	$("#about .iphone .title li").click(function(){
		$(this).addClass("click").siblings().removeClass("click");
		var liIndex=$(this).index();
		var itemT=$("#about .iphone .content .contentitem").eq(liIndex)
		.offset().top;
		$(window).scrollTop(itemT-36);
	})
	//滚轮事件
	var iphonetitle=$("#about .iphone .title")
	var titleT=iphonetitle.offset().top;
	var contentitems=$("#about .iphone .content .contentitem")
	$(window).scroll(function(){
		if( $(window).scrollTop()>=titleT ){
			iphonetitle.css({
				position:"fixed",
				top:0
			})
		}else{
			iphonetitle.css({
				position:"static",
				top:"auto"
			})
		}
		contentitems.each(function(k,v){
			var itemT=$(v).offset().top;
			var itemB=$(v).offset().top+$(v).outerHeight();
			if( $(window).scrollTop()+37 > itemT && $(window).scrollTop()+37 <=itemB){
				$("#about .iphone .title li").eq(k).addClass("click")
				.siblings().removeClass("click");
				return false;
			}
		})
	})
	/*引入底部文件*/
	$("#addbottom").load("bottom.html");
})

































