
//此脚本文件为共用脚本，请尽量不要改动

/*********************************************************全站公用 START*********/

$(function(){
	
	//鼠标滑动下拉
	flag_hov=0;
	$(".H_hov").hover(function(){
		if(flag_hov==0){
			$(this).find(".H_a").addClass("on");
			$(this).find(".H_div").slideDown(0);
			flag_hov=1;
		}else{
			$(this).find(".H_a").removeClass("on");
			$(this).find(".H_div").slideUp(0);
			flag_hov=0;
		}
	});

	//切换卡[H_clks]
	$(".H_clks .H_keys li:first-child").addClass("on");
	$(".H_clks .H_divs .H_div:first-child").show();
	$(".H_clks .H_keys li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var cur=$(this).index();
		$(this).parents(".H_clks").find(".H_divs .H_div").hide().eq(cur).show();
		$(window).scroll();	
	});

	//切换卡[H_hovs]
	$(".H_hovs .H_keys li:first-child").addClass("on");
	$(".H_hovs .H_divs .H_div:first-child").show();
	$(".H_hovs .H_keys li").hover(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var cur=$(this).index();
		$(this).parents(".H_hovs").find(".H_divs .H_div").hide().eq(cur).show();
		$(window).scroll();	
	});

	//顶部购物车
	$(".TopCart").delegate(".Del","click",function(){
		$(this).parents(".Dl").animate({"margin-left":"-220px"},400,function(){
			$(this).remove();
			flag_hov=0;
			var num=$("#Top_cart .Num").text();
			$("#Top_cart .Num").text(num-1);
			if(num==1){
				$("#Top_cart").find(".H_div h6").text("购物车没有商品");
				$("#Top_cart").find(".H_div .txtR").remove();
			}
			$("#Top_cart").find(".H_div").mouseout(function(){
				flag_hov=1;
			});
		});
	});	

	//首页搜索切换
	$(".Search_wrap .Tabs").delegate("a","click",function(){
		$(this).addClass("on").siblings("a").removeClass("on");	
		$(".Search_wrap .HSearch").eq($(this).index()).show().siblings(".HSearch").hide();
	});
	
	//首页搜索下拉[fucus]
	$("#search_prod").find("input[name=keyword]").on("focus",function(){
		$(".kwDrop").show();
		if(!$(".Search_wrap #h_mask").length>0){
			$(".Search_wrap").append('<div id="h_mask"></div>');
		}
		$(".kwDrop ol").delegate("a","click",function(){
			$("#search_prod").find("input[name=keyword]").val($(this).text());
			$(".kwDrop").hide();
			$("#h_mask").remove();
			searchSumbit();
		});
		$("#h_mask").delegate("","click",function(){
			$(".kwDrop").hide();
			$("#h_mask").remove();
		});
	});
	//首页搜索下拉[键盘操作]
	$(document).keydown(function(event){
    var theEvent = window.event || event;
    var code = theEvent.keyCode || theEvent.which;		
		if(code==38){
			if($(".kwDrop ol a").hasClass("on")){
				var cur=$(".kwDrop ol a.on").index();
				$(".kwDrop ol a").removeClass("on").eq(eval(cur-1)).addClass("on");
			}else{
				$(".kwDrop ol a").last().addClass("on");
			}
			$("#search_prod").find("input[name=keyword]").val($(".kwDrop ol a.on").text());
		}
		if(code==40){
			if($(".kwDrop ol a").hasClass("on")){
				var cur=$(".kwDrop ol a.on").index();
				$(".kwDrop ol a").removeClass("on").eq(eval(cur+1)).addClass("on");
			}else{
				$(".kwDrop ol a").eq(0).addClass("on");
			}
			$("#search_prod").find("input[name=keyword]").val($(".kwDrop ol a.on").text());
		}
	});
	//首页搜索下拉[点击搜索按键]
	$($("#search_prod").find("input[type=submit]")).click(function(){
		searchSumbit();
	});
	//首页搜索下拉[提交函数]
	function searchSumbit(){
		if(!$("#search_prod").find("input[name=keyword]").val()){
			var val=$("#search_prod").find("input[name=keyword]").attr("placeholder");
			$("#search_prod").find("input[name=keyword]").val(val);
		}
		$("#search_prod").submit();
	}
	
	
	
	//浮动右栏[弹出提示]
	var isIE = !!window.ActiveXObject;   
	var isIE6 = isIE && !window.XMLHttpRequest;   
    if (isIE6) {   
		$("#FixRight").height(200);
    }else{
		$("#FixRight").height(pageHeight());
	}  	
	$("#FixRight ol a").hover(function(){
		if(!$(this).hasClass("KeyFav")){
			$(this).toggleClass("on");
			if($(this).hasClass("on")){
				$(this).find("h6").show().animate({"left":"-100px"},300);
			}else{
				$(this).find("h6").animate({"left":"0"},300,function(){
					$(this).hide();
				});
			}
		}
	});	
	//浮动右栏[猜你喜欢]
	flag_fav=0;
	$("#FixRight").delegate(".KeyFav","click",function(){
		if(flag_fav==0){
			$(this).addClass("on");
			$("#dialogFav").animate({"right":"36px"},400);
			addMask("h_mask");
			$("#h_mask").add($("#dialogFav .H_quit")).delegate("","click",function(){
				$("#h_mask").remove();
				$("#dialogFav").animate({"right":"-951px"},400,function(){
					$("#FixRight .KeyFav").removeClass("on");
				});
				flag_fav=0;
			});
			flag_fav=1;
		}
		$(window).scroll(function(){
			if(flag_fav==1){
				$("#h_mask").remove();
				$("#dialogFav").animate({"right":"-951px"},400,function(){
					$("#FixRight .KeyFav").removeClass("on");
				});
				flag_fav=0;
			}
		});
	});

});




//文本上下轮播
function txtScroll($wraper){
	var speeds=100;
	$wraper.find(".jsScroll_2").html($wraper.find(".jsScroll_1").html());
	var MyMar1=setInterval(function(){
		var over=$wraper.find(".jsScroll_2").height()-$wraper.scrollTop();
		if(over>0){
			var sTop=$wraper.scrollTop()+1;
			$wraper.scrollTop(sTop);
		}else{
			$wraper.scrollTop(0);
		} 
	},speeds);
}
$(function(){ txtScroll($('#jsScroll_a')); });//公告轮播




/**********************店铺切换[头部] start*****/
$(function(){
	$("#City_Switch").click(function(){
		$(".win_shop").show();	
		addMask("h_maskB");
	});	
	$(".win_shop .HQuit").click(function(){
		$(".win_shop").hide();	
		$("#h_maskB").remove();
	});
});
/**********************店铺切换[头部] end*****/


//返回顶部
$(window).scroll(function(){
	if( pageScroll() > 100 ){//滚动到100px才显示   
		$(".HGotop").fadeIn();    
	}else{      
		$(".HGotop").stop().hide();
	}
});
$(function(){
	$(".HGotop").delegate('','click',function(){
		$("html,body").animate({scrollTop:"0px"},200);	
	});
});


/*********************************************************全站公用 END*********/






/*********************************************************自定义函数 START*********/


var valT=0;//setTimeout是否在进行


//屏幕高度
function pageHeight(){
	var pageHeight = window.innerHeight; 
	if(typeof pageHeight != "number"){ 
		if(document.compatMode == "number"){ 
			pageHeight = document.documentElement.clientHeight; 
		}else{ 
			pageHeight = document.body.clientHeight; 
		} 
	} 
	return pageHeight;
}//pageHeight_end


//屏幕宽度
function pageWidth(){
	var pageWidth = window.innerWidth; 
	if(typeof pageWidth != "number"){ 
		if(document.compatMode == "number"){ 
			pageWidth = document.documentElement.clientWidth; 
		}else{ 
			pageWidth = document.body.clientWidth; 
		} 
	} 
	if(pageWidth>=640){	pageWidth=640;}
	if(pageWidth<=320){	pageWidth=320;}
	return pageWidth;
}//pageWidth_end


//滚动距离
function pageScroll(){
	var scrollTop=document.documentElement.scrollTop + document.body.scrollTop; 
	return scrollTop;
}//pageScroll_end


//锁屏
function pageLock2(){
	var sum_pageH=pageHeight()+pageScroll();
	$("html,body").height(sum_pageH).css("overflow-y","hidden");
}
//解锁
function pageUnlock2(){
	$("html,body").height("auto").css("overflow-y","auto");
}


//添加覆盖层
function addMask(maskId){
	if(!$("body").is(':has("#'+maskId+'")')){
		$("body").append('<div id="'+maskId+'"></div>');	
	}
}//addMask_end


//隐藏对话框_[点击覆盖层或对话框关闭键]
function hideM(maskId,dialogDiv,act,keyOn){
	$("#"+maskId+"").add($(".H_quit")).delegate('','click',function(){
		$("#"+maskId+"").remove();
		if(act=="remove"){//直接删掉
			$(dialogDiv).remove();
		}else{//默认隐藏
			$(dialogDiv).hide();
		}
		pageUnlock2();
		if(valT==1){ clearT();}
		if(keyOn){ $(keyOn).removeClass("on");}
	});		   
}//hideM_end


//隐藏对话框[滚动时]
function hideS(maskId,dialogDiv,act,keyOn){
	$(window).scroll(function(){
		$("#"+maskId+"").remove();
		if(act=="remove"){//直接删掉
			$(dialogDiv).remove();
		}else{//默认隐藏
			$(dialogDiv).hide();
		}
		pageUnlock2();
		if(valT==1){ clearT();}
		if(keyOn){ $(keyOn).removeClass("on");}
	});
}//hideS_end


//点击下拉切换
function clkToggle(toggleDiv,$this,parentDiv,noHide){
	if($($this).parents(parentDiv).find(toggleDiv).is(':visible')){
		if($this){ $($this).removeClass("on");}
		$($this).parents(parentDiv).find(toggleDiv).hide();
		$("#h_mask").remove();
	}else{
		if($this){ $($this).addClass("on");}
		$($this).parents(parentDiv).find(toggleDiv).show().parents(parentDiv).siblings(parentDiv).find(toggleDiv).hide();
		addMask("h_mask");
	};
	if(noHide){
		if(noHide=="hideM"){
			hideM("h_mask",toggleDiv,"",$this);		   
		}
	}else{
		hideM("h_mask",toggleDiv,"",$this);		   
		hideS("h_mask",toggleDiv,"",$this);
	}
}//clkToggle_end


//上下居中
function wCen(dialogDiv,subHeight){
	top_div=(pageHeight()-$(dialogDiv).height()+subHeight)/2;
	$(dialogDiv).css("top",top_div);
}


//对话框四周居中
function dialogCen(maskId,dialogDiv,subHeight,noHide){
	addMask(maskId);
	wCen(dialogDiv,subHeight);
	$(dialogDiv).show();
	if(!noHide){
		hideM(maskId,dialogDiv,"");		   
		hideS(maskId,dialogDiv,"");
	}
	if(noHide=="hideM"){
		pageLock2();
		hideM(maskId,dialogDiv,"");		   
	}
}


//限时
function setT(maskId,dialogDiv,time){
	t=setTimeout(function(){
		$(dialogDiv).remove();
		$("#"+maskId+"").remove();
		pageUnlock2();
	},time);	
	valT=1;
}
//取消限时
function clearT(){
	clearTimeout(t);	
	valT=0;
}


/*********************************************************自定义函数 END*********/



