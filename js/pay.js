$(function(){
	//加载顶部
	$("#addtop").load("top.html");
	//操作结算
	var Cart={
		data:{},//Json
		cart:{},//cookie
		payCon:$("#main .content"),
		pay:{},
		init:function(){
			this.readCookie();
			var that=this;
			//读取JSON文件
			$.getJSON("json/product.json",function(a){
				that.data=a;
				//遍历cookie将数据放到页面上(闭包)
				for(var key in that.cart){
					(function(key){
						var ul=$('<ul class="clear"></ul>');
						ul.load("payli.html",function(){
							var gid=that.cart[key]["goodsId"];
							ul.attr({
								'data-gid': gid,
								'data-colorid': key
							});
							//填充信息
							//颜色
							var colorData=that.data[gid]["color"];
							for(var i=0;i<colorData.length;i++){
								if(colorData[i].id==key){
									ul.find(".color").html(colorData[i].des)
								}
							}
							//价格
							ul.find(".price").html(that.data[gid]["goods-sale"].toFixed(1));
							//数量
							ul.find(".changeamount input").val(that.cart[key].amount);
							//总价
							var money=that.data[gid]["goods-sale"]*that.cart[key].amount;
							ul.find(".total").html(money.toFixed(1))
							//将ul放入payCon
							that.payCon.append(ul)
						})
					})(key)
					
				}
			})
			this.addnum();
			this.decnum();
			this.input();
			this.remove();
			this.select();
			this.selectAll();
			this.deleteAll();
		},
		//点击+
		addnum:function(){
			var that=this;
			this.payCon.on("click",".add",function(){
				var amount=$(this).prev().val();
				//判断是否超库存
				if(amount >= 1493){
					return;
				}
				amount++;
				$(this).prev().val(amount);
				//调用操作cookie功能
				that.handleCookie( $(this).prev() );
			})
		},
		//点击-
		decnum:function(){
			var that=this;
			this.payCon.on("click",".dec",function(){
				var amount=$(this).next().val();
				//判断是否小于1
				if(amount <= 1){
					return;
				}
				amount--;
				$(this).next().val(amount);
				//调用操作cookie功能
				that.handleCookie( $(this).next() );
			})
		},
		//输入
		input:function(){
			var that=this;
			this.payCon.on("input","input",function(){
				var amount=$(this).val();
				amount=parseInt(amount);
				if(amount >= 1493){
					amount = 1493;
				}
				if(isNaN( amount )||amount==0){
					$(this).val(1);
				}else{
					$(this).val(amount);
				}
				//调用操作cookie功能
				that.handleCookie( $(this) );
			})
		},
		//单件商品删除
		remove: function(){
			var that = this;
			this.payCon.on('click','.handle',function(){
				if( confirm('老板，要忍心删除宝贝吗？') ){
					//当前商品从页面消失
					$(this).parents('ul').remove();
					//从cookie中删除
					var colorId = $(this).parents('ul').data('colorid');
					//删除  
					delete that.cart[colorId];
					that.setCookie();
				}
			});
		},
		//商品选择
		select:function(){
			var that = this;
			this.payCon.on('change','input[type="checkbox"]',function(){
				var goodsItem = $(this).parents('ul');
				//获取商品id
				var colorId = goodsItem.data('colorid');
				//总价
				var total = goodsItem.find('.total').html();
				//如果已经存在，再点击取消
				if(!goodsItem.find('input[type="checkbox"]').prop('checked')){
					delete that.pay[colorId];
				}else{
					that.pay[colorId] = total;
				}
				//判断是否需要选中或者撤销全选按钮的选中状态
				var allCheckBox = that.payCon.find('input[type="checkbox"]');
				var allChecked = that.payCon.find('input[type="checkbox"]:checked');
				//比较所有复选框的个数和被选中复选框的个数，如果相等，则全部被选中了
				if(allCheckBox.length == allChecked.length){
					//让全选按钮选中
					$('.allcheck').prop('checked',true);
				}else{
					$('.allcheck').prop('checked',false);
				}
				//调用处理总价
				that.handlePay();
			});
		},
		//全选
		selectAll:function(){
			$('.allcheck').click(function(){
				//获取自己的状态  选中或者不选中
				var status = $(this).prop('checked');
				var allCheckbox = $('.content input[type="checkbox"]');
				//如果自己选中
				if(status){
					//让所有商品的选择按钮选中
					allCheckbox.prop('checked',true);
				}else{
					//让所有商品的选择按钮不选中
					allCheckbox.prop('checked',false);
				}
				//触发商品前面的复选框
				allCheckbox.change();
			});
		},
		//清空购物车
		deleteAll:function(){
			$(".delete").click(function(){
				if( $(".content ul").length>0 ){
					if( confirm("老板，您真的要清空购物车吗？") ){
						$(".content ul").remove();
						$.removeCookie("iphone",{path:"/"})
					}
				}else{
					alert("老板，您的购物车本来就是空的呢！")
				}
				
			})
		},
		//处理总价
		handlePay: function(){
			var goodsMoney = $('.paynum');
			var goPay = $('.paymoneny');
			//遍历pay对象，获取件数和总价
			var totalNum = 0;
			var totalMoney = 0;
			for(var key in this.pay){
				totalNum++;
				totalMoney += parseFloat(this.pay[key]);
			}
			//处理结算按钮
			if(totalNum > 0){
				goPay.addClass('buy');
			}else{
				goPay.removeClass('buy');
			}
			//给总价重新赋值
			goodsMoney.html(totalMoney.toFixed(1));
		},
		//操作cookie
		handleCookie:function(input){
			var goodsItem=input.parents("ul");
			var colorId=goodsItem.data('colorid');
			//处理单件商品的总价
			var price=parseFloat( goodsItem.find(".price").html() )
			goodsItem.find(".total").html( ( parseInt(input.val()) * price ).toFixed(1) )
			//重新给cart中的数量赋值
			this.cart[colorId].amount = parseInt( input.val() );
			//回写cookie
			this.setCookie();
			//判断当前商品是否被选中
			if(goodsItem.find('input[type="checkbox"]').prop('checked')){
				//改变pay对象里面当前商品的总价
				this.pay[colorId] = ( parseInt(input.val()) * price ).toFixed(1);
				//调用结算商品信息方法
				this.handlePay();
			}
		},
		//读取cookie
		readCookie:function(){
			this.cart=$.cookie("iphone")||"{}";
			this.cart=JSON.parse(this.cart);
		},
		//设置cookie
		setCookie:function(){
			$.cookie("iphone",JSON.stringify(this.cart),{expires:365,path:'/'})
		}
	}
	Cart.init();
})




















































































































