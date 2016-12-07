$(function(){
	$("#main .wrap .loginbox").animate({
		top:0
	},500)
	/*注册信息验证*/
	var flag1=false;
	var flag2=false;
	var flag3=false;
	//手机号(失焦验证)
	var phoneReg=/^1[3578]\d{9}$/;/*phoneReg=/^((13)|(15)|(17)|(18))\d{9}$/
										phoneReg=/^[(13)(15)(17)(18)]\d{9}$/					*/
	
	$("#main .wrap .loginbox .content .item .top .phone").blur(function(){
		var phoneV=$(this).val();
		if(phoneV.length==0){
			$(this).parent().next().html("-手机号码不能为空。").css({color:"#666"});
			flag1=false;
			return;
		}
		if( !phoneReg.test(phoneV) ){
			$(this).parent().next().html("-手机号码不合法。").css({color:"#666"});
			flag1=false;
			return;
		}
		$(this).parent().next().css({color:"green"}).html("-手机号码可以使用。");
		flag1=true;
	});
	//email(失焦验证)
		var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	
	$("#main .wrap .loginbox .content .item .top .email").blur(function(){
		var emailV=$(this).val();
		if(emailV.length==0){
			$(this).parent().next().html("-email号码不能为空。").css({color:"#666"});
			flag1=false;
			return;
		}
		if( !emailReg.test(emailV) ){
			$(this).parent().next().html("-email号码不合法。").css({color:"#666"});
			flag1=false;
			return;
		}
		$(this).parent().next().css({color:"green"}).html("-email号码可以使用。");
		flag1=true;
	});
	
	//密码 ：不得少于6位数  纯数字为弱 有字母为中 有特殊字符为强
	//失焦
	$("#main .wrap .loginbox .content .item .top .psw").blur(function(){
		var pswV=$(this).val();
		var sureV=$("#main .wrap .loginbox .content .item .top .sure").val();
		if(pswV.length<6){
			$(this).parent().next().show().html("- 登录密码不能少于 6 个字符。").next().hide();
			flag2=false;
			return;
		}else{
			flag2=true;
		}
		if(pswV==sureV){
			$("#main .wrap .loginbox .content .item .top .sure")
			.parent().next().html("*可以注册。").css({color:"green"});
			flag3=true;
		}else{
			flag3=false;
		}
	});
	//输入
	var pswReg1=/^\d+$/;
	var pswReg2=/[abcdefghijklmnopqrstuvwxyz]+/;
	var pswReg3=/[!@#%]+/;
	var strongBox=$("#main .wrap .loginbox .content .item:nth-child(2) .strong span");
	$("#main .wrap .loginbox .content .item .top .psw").on("input",function(){
		var pswV=$(this).val();
		$(this).parent().next().hide().next().show();
		
		if( pswReg3.test(pswV) ){
			strongBox.eq(2).css({
				borderColor:"green"
			}).siblings().css({
				borderColor:"#ccc"
			});
			return;
		}
		if( pswReg2.test(pswV) ){
			strongBox.eq(1).css({
				borderColor:"yellow"
			}).siblings().css({
				borderColor:"#ccc"
			});
			return;
		}
		if( pswReg1.test(pswV) ){
			strongBox.eq(0).css({
				borderColor:"red"
			}).siblings().css({
				borderColor:"#ccc"
			});
			return;
		}
		strongBox.css({
			borderColor:"#ccc"
		})
	});
	//确认密码
	$("#main .wrap .loginbox .content .item .top .sure").blur(function(){
		var sureV=$(this).val();
		var pswV=$("#main .wrap .loginbox .content .item .top .psw").val();
		if(sureV.length<6){
			$(this).parent().next().html("-登录密码不能少于 6 个字符。").css({color:"#666"});
			flag3=false;
			return;
		}
		if(sureV==pswV){
			$(this).parent().next().html("*两次密码输入一致。").css({color:"green"});
			flag3=true;
		}else{
			$(this).parent().next().html("-两次密码输入不一致。").css({color:"#666"});
			flag3=false;
		}
	});
	//点击【立即注册】
	$("#main .wrap .loginbox .content .login").click(function(){		
		if(flag1&&flag2&&flag3){
			if(!$(".accept").prop("checked")){
				$(".accept").next().fadeOut(60).fadeIn(60).fadeOut(50).fadeIn(50);
				return;
			}
			alert("注册成功！");
		}else{
			alert("所需信息不完整！");
		}
	})
	
	/*切换注册*/
	var errors=$("#main .wrap .loginbox .content .item .error");
	$("#main .wrap .loginbox .title ul li").click(function(){
		//点击后将所有开关关闭
		flag1=false;
		flag2=false;
		flag3=false;
		//点击后清空所有错误区信息
		errors.each(function(){
			$(this).html("");
		})
		//点击后清空所有input的值
		$("#main .wrap .loginbox .content .item .top input").each(function(){
			$(this).val("");
		})
		var email=$("#main .wrap .loginbox .content .itemE");
		$(this).addClass("click").siblings().removeClass("click");
		if($(this).index()==1){			
			email.show().siblings().hide();			
		}else{
			email.hide().siblings().show();
		};
	})
})






