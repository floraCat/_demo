requirejs.config({
	baseUrl:'js/require',	 
	paths:{
		fly:'../fly'	
	},
	shim:{
		index:['jquery-1.10.2','global']
	}
});



require(['index','slider'],function(){
	$("#HFocus1").h_pics({mode:"slide",pos_os:"center",gap_o:6,line:1,row:1,effect:"return",autoPlay:true,delayTime:4000});	//轮播图						
});

require(['fly/jquery.fly.min'],function(){//飞入购物车
	$(".keProd .cart").click(function(event){
		var offset = $("#Top_cart").offset();
		var addcar = $(this);
		var img = addcar.parents("li").find('img').attr('src');
		var flyer = $('<img class="u-flyer" style="display: block;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 9999;" src="'+img+'">');
		flyer.fly({
			start: {
				left: event.pageX,
				top: event.pageY-$(window).scrollTop()-80
			},
			end: {
				left: offset.left+10,
				top: offset.top-$(window).scrollTop()+10,
				width: 0,
				height: 0
			},
			speed:1.8,
			onEnd: function(){
				this.destory();
				var cur_num=$("#Top_cart .Num").text();
				$("#Top_cart .Num").text(parseInt(cur_num)+1);
			}
		});
	});										
});
