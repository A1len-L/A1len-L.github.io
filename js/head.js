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
})
//鼠标移入显示二级菜单
$("#nav .allgoods").mouseenter(function(){
	$("#nav .allgoods ul.goodslist").show();
})
//鼠标移出ul还原
$("#nav .allgoods").mouseleave(function(){
	$(this).find("li.hover").removeClass("hover");
	/*三级菜单隐藏*/
	$("#nav .allgoods .goodscontent").hide();
	/*二级菜单隐藏*/
	$("#nav .allgoods ul.goodslist").hide();
})