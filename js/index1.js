$(function(){
	/*点击宝贝、店铺*/
	$("#head .sesrch .search-top span").click(function(){
		$(this).addClass("bg").siblings().removeClass("bg")
	})
	
	/*操作商品分类的二级菜单*/
	$("#nav .allgoods ul.goodslist li").mouseenter(function(){
		/*改变li的背景，字体颜色等*/
		$(this).addClass("hover").siblings().removeClass("hover");
		/*三级菜单显示*/
		$("#nav .allgoods .goodscontent").show();
		/*控制菜单选项卡*/
		var goodsitems=$("#nav .allgoods .goodscontent .goodsitem");
		goodsitems.eq( $(this).index() ).show().siblings().hide();
		
		var t=$(this).position().top;//获取事件执行者li相对于ul的位置
		if( $(this).index()==0 ){
			t=39;
		}else{
			t=t-32+39
		}
		$("#nav .allgoods .goodscontent").css("top",t);
		
		/*//移入不消失
		$("#nav .allgoods .goodscontent").mouseenter(function(){
			$(this).show();
		})
		//移出消失
		$("#nav .allgoods .goodscontent").mouseleave(function(){
			$(this).hide();
		})*/
	})	
	//鼠标移出ul还原
	$("#nav .allgoods").mouseleave(function(){
		$(this).find("li.hover").removeClass("hover");
		/*三级菜单隐藏*/
		$("#nav .allgoods .goodscontent").hide();
	})
	
	//banner区右下角选项卡
	var bannerSpans=$("#banner .banright .advertisement .advertisement-title span");
	var bannerDivs=$("#banner .banright .advertisement-content-item");
	bannerSpans.mouseenter(function(){
		$(this).addClass("bg").siblings().removeClass("bg");
		bannerDivs.eq($(this).index()).addClass("show")
		.siblings().removeClass("show");
	})
	//banner淡入淡出
	var banner={
		banner:$("#banner"),
		imgs:$("#banner .imgbox li"),
		circlrs:$("#banner .banbottom .cirlcebox span"),
		now:0,
		next:0,
		timer:null,
		init:function(){
			this.autoPlay();
			this.changeAutoPlay();
			this.click();
		},
		autoPlay:function(){
			var that=this;
			this.timer=setInterval(function(){
				that.next++;
				that.next%=that.imgs.length;
				that.change();
			},2500)
		},
		//暂停和开始自动轮播
		changeAutoPlay:function(){
			var that=this;
			this.circlrs.mouseenter(function(){
				clearInterval(that.timer)
			})
			this.circlrs.mouseleave(function(){
				that.timer=setInterval(function(){
					that.next++;
					that.next%=that.imgs.length;
					that.change();
				},2500)
			})
		},
		//点击小圆圈
		click:function(){
			var that=this;
			this.circlrs.click(function(){
				that.next=$(this).index();
				that.change();
			})
		},
		//操作图片和小圆圈
		change:function(){
			if(this.now==this.next){
				return;
			}
			this.imgs.eq(this.now).fadeOut(1000);
			this.imgs.eq(this.next).fadeIn(1000);
			this.circlrs.eq(this.now).removeClass("bg");
			this.circlrs.eq(this.next).addClass("bg");
			this.now=this.next;
		}
	}
	banner.init();
	
	//酒区效果
	//1.单张图片移动
	$("#wine .wcontent .winebox .wineitem li").mouseenter(function(){
		$(this).find("img").stop(true).animate({
			["margin-left"]:-100
		})
	})
	$("#wine .wcontent .winebox .wineitem li").mouseleave(function(){
		$(this).find("img").stop(true).animate({
			["margin-left"]:0
		})
	})
	//2.酒区轮播
	var wineArea={
		index:0,
		wineBox:$("#wine .wcontent .winebox"),
		btnl:$("#wine .wcontent .arrow.btnl"),
		btnr:$("#wine .wcontent .arrow.btnr"),
		titles:$("#wine .wtitle ul li"),
		tiao:$("#wine .wtitle .underline"),
		num:0,
		init:function(){
			this.click();
			this.hover();
		},
		//点击
		click:function(){
			var that=this;
			this.btnr.click(function(){
				that.num++;
				if(that.num>2){
					that.num=2;
					return;
				}
				that.index++;
				that.change()
			})
			this.btnl.click(function(){
				that.num--;
				if(that.num<0){
					that.num=0;
					return;
				}
				that.index--;
				that.change();
			})
		},
		//划过title
		hover:function(){
			var that=this;
			this.titles.mouseenter(function(){
				that.index=$(this).index();
				that.num=$(this).index();
				that.change();
			})
		},
		//改变
		change:function(){
			//图片
			this.wineBox.stop(true).animate({
				marginLeft:-1183*this.index
			},1000);
			//title颜色
			this.titles.eq(this.index).addClass("bg")
			.siblings().removeClass("bg");
			//红条
			this.tiao.stop(true).animate({
				left:105*this.index
			},600);
		}
	}
	wineArea.init();
	
	//店铺区效果
	var flogstor={};
	$("#hotstores .hot-content .allstores li").mouseenter(function(){
		var index = $(this).index();
		if(!flogstor[index]){
			flogstor[index]=true;
		}else{
			return;
		}
		$(this).find("img").stop(true).animate({
			top:5
		},200,"linear",function(){
			$(this).animate({
				top:15
			},100,"linear",function(){
				$(this).animate({
					top:8
				},90,"linear",function(){
					$(this).animate({
						top:15
					},50,"linear",function(){
						$(this).animate({
							top:11
						},40,"linear",function(){
							$(this).animate({
								top:15
							},30,"linear",function(){
								$(this).animate({
									top:14
								},20,"linear",function(){
									$(this).animate({
										top:15
									},10,"linear",function(){
										flogstor[index] = false;
									})
								})
							})
						})
					})
				})
			})
		})
	})
	
	//sale区选项卡
	//去除#sale .salel .sale-content .saleitem最后li的border
	$("#sale .salel .sale-content .saleitem li:last-child").css({
		border:0
	})
	$("#sale .salel .sale-top .sale-title span").mouseenter(function(){
		var index=$(this).index();
		$(this).addClass("bg").siblings().removeClass("bg");
		$("#sale .salel .sale-top .underline").css({
			marginLeft:200*index
		})
		$("#sale .salel .sale-content .saleitem").eq(index).show()
		.siblings().hide();
	})
	//sale区滚动轮播
	var sale={
		imgs:$("#sale .saler .contentr .look .imgbox img"),
		imgbox:$("#sale .saler .contentr .look .imgbox"),
		btn:$("#sale .saler .contentr .look .btn"),
		btnl:$("#sale .saler .contentr .look .btnl"),
		btnr:$("#sale .saler .contentr .look .btnr"),
		look:$("#sale .saler .contentr .look"),
		index:0,
		timer:null,
		init:function(){
			this.click();
			this.autoPlay();
			this.hover();
		},
		click:function(){
			var that=this;
			this.btnr.click(function(){
				that.index++;
				that.index%=that.imgs.length
				that.imgbox.animate({
					marginLeft:-210*that.index
				},1000)
			})
			this.btnl.click(function(){
				that.index--;
				if(that.index<0){
					that.index=that.imgs.length-1
				}
				that.imgbox.animate({
					marginLeft:-210*that.index
				},1000)
			})
		},
		autoPlay:function(){
			var that=this;
			this.timer=setInterval(function(){
				that.index++;
				that.index%=that.imgs.length
				that.imgbox.animate({
					marginLeft:-210*that.index
				},1000)
			},2000)
		},
		hover:function(){
			var that=this;
			this.look.hover(function(){
				that.btn.show();
				clearInterval(that.timer)
			},function(){
				that.btn.hide();
				that.timer=setInterval(function(){
					that.index++;
					that.index%=that.imgs.length
					that.imgbox.animate({
						marginLeft:-210*that.index
					},1000)
				},2000)
			})
		}
	}
	sale.init();
	//加载楼区
	$("#addfloor1").load("floor1.html",function(){
		$.getScript("js/floor.js");
	});
	$("#addfloor2").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor2 #floor1 .floortop .floortitle h3").html("2F 服装服饰 ");
		$("#addfloor2 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#c33");
	});
	$("#addfloor3").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor3 #floor1 .floortop .floortitle h3").html("3F 个护化妆  ");
		$("#addfloor3 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#f99");
	});
	$("#addfloor4").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor4 #floor1 .floortop .floortitle h3").html("4F 手机数码  ");
		$("#addfloor4 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#9f9");
	});
	$("#addfloor5").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor5 #floor1 .floortop .floortitle h3").html("5F 家用电器 ");
		$("#addfloor5 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#99f");
	});
	$("#addfloor6").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor6 #floor1 .floortop .floortitle h3").html("6F 家居日用 ");
		$("#addfloor6 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#f9f");
	});
	$("#addfloor7").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor7 #floor1 .floortop .floortitle h3").html("7F 酒类饮料");
		$("#addfloor7 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#c97bff");
	});
	$("#addfloor8").load("floor1.html",function(){
		$.getScript("js/floor.js");
		$("#addfloor8 #floor1 .floortop .floortitle h3").html("8F 母婴用品");
		$("#addfloor8 #floor1 .floortop .floorcontent .floormenu .floormenulist ").
		css("background-color","#ffbb00");
	});
	
	/*沿街店铺区*/
	$("#store .content li").mouseenter(function(){
		$(this).find("img").stop(true).animate({
			width:180,
			left:-15,
			height:180,			
			top:-15
		},300)
	});
	$("#store .content li").mouseleave(function(){
		$(this).find("img").stop(true).animate({
			width:150,
			left:0,
			height:150,			
			top:0
		},300)
	});
	/*引入bottom*/
	$("#addbottom").load("bottom.html");
})




























