//楼区选项卡
	$("#floor1 .floortop .floortitle ul li").mouseenter(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".floortitle").next().find(".flooritem")
		.eq(index).show().siblings().hide();
	})
	//楼区底部轮播
	var floorbottom={
		imgbox:null,
		btnl:$("#floor1 .floorbottom .gol"),
		btnr:$("#floor1 .floorbottom .gor"),
		index:0,
		init:function(){
			var that=this;
			this.btnr.click(function(){
				that.imgbox=$(this).parent().find(".floorbottomimgbox");
				if(that.index>3){
					return;
				}
				that.index++;
				that.imgbox.stop(true).animate({
					marginLeft:-121*that.index
				})
			})
			this.btnl.click(function(){
				that.imgbox=$(this).parent().find(".floorbottomimgbox");
				if(that.index<=0){
					return;
				}
				that.index--;
				that.imgbox.stop(true).animate({
					marginLeft:-121*that.index
				})
			})
		}
	}
	floorbottom.init();