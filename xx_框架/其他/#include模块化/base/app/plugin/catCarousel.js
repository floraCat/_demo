!function(t,i,e,s){function n(i){this.obj=t(i),this.options=this.obj.data("js-carousel"),this.settings=t.extend({},o,this.options),this.itemBox=this.obj.find(this.settings.itemBox),this.navBox=this.obj.find(this.settings.navBox),this.prev=this.obj.find(this.settings.prev),this.next=this.obj.find(this.settings.next),this.effect=this.settings.effect,this.perUnit=this.settings.perUnit,this.default_on=this.settings.default_on,this.hasNav=0!=this.settings.hasNav&&"false"!=this.settings.hasNav,this.loop=1==this.settings.loop||"true"==this.settings.loop,this.autoPlay=0!=this.settings.autoPlay&&"false"!=this.settings.autoPlay,this.delayAnimate=this.settings.delayAnimate,this.delayTime=this.settings.delayTime,this.init()}var h="H_carousel",o={itemBox:".itemBox",navBox:".os",prev:".prev",next:".next",effect:"fade",perUnit:1,default_on:0,hasNav:!1,loop:!0,autoPlay:!0,delayAnimate:400,delayTime:3e3};t.extend(n.prototype,{init:function(){this.items=this.itemBox.children(),this.itemSize=this.items.length,this.page=this.perUnit>1?Math.ceil(this.itemSize/this.perUnit):this.itemSize,this.unitSize=this.page,this.prev_index=this.index=this.default_on,this.next_index=this.index+1,this.perUnit>1&&this.group(),this.unit=this.itemBox.children(),this.first=0,this.last=this.unitSize-1,this.layout(),this.handleNav(),this.handleArrow(),this.autoPlay&&(this.auto_play(),this.hoverStop())},group:function(){for(var i=[],e=0;e<this.page;e++){i[e]=[];for(var s=0;s<this.perUnit;s++){var n=this.items.eq(e*this.perUnit+s);i[e].push(n)}$htmlUnit=t('<div class="unit" style="float:left; overflow:hidden;"></div>').appendTo(this.itemBox).html(i[e])}},layout:function(){this.itemBox.wrap('<div class="tempWrap" style=" overflow:hidden; position:relative;"></div>'),this.unit.width(this.obj.width()),"fade"==this.effect?(this.itemBox.css({position:"relative",width:this.obj.width()+"px",height:this.obj.height()+"px"}),this.unit.css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}).hide().eq(this.index).show()):(this.loop&&(this.unit.css({"float":"left"}),this.itemBox.prepend(this.unit.eq(this.page-1).clone()).append(this.unit.eq(1).clone()),this.unitSize+=2,this.index+=1,this.first=1,this.last=this.unitSize-1,this.itemBox.css("left","-"+this.obj.width()*this.index+"px")),this.itemBox.width(this.obj.width()*this.unitSize))},handleNav:function(){var i=this;if(!this.hasNav)for(var e=0;e<this.page;e++)this.navBox.append("<li>"+e+"</li>");this.navBox.children().eq(this.default_on).addClass("on"),this.navBox.children().on("mouseover",function(){var e=t(this).index();"slide"==i.effect&&i.loop?e!=i.index-1&&(i.prev_index=i.index,i.next_index=e+1,i.index=e+1):e!=i.index&&(i.prev_index=i.index,i.next_index=e,i.index=e),i.doPlay()})},classArrow:function(){this.loop||(this.prev.add(this.next).removeClass("off"),this.index==this.first&&this.prev.addClass("off"),this.index==this.last&&this.next.addClass("off"))},handleArrow:function(){var t=this;this.prev.on("click",function(){t.index==t.first?t.loop?(t.prev_index=t.first,t.next_index=t.last,t.index=t.last):(t.prev_index=t.next_index=t.first,t.index=t.first):(t.prev_index=t.index,t.next_index=t.index-1,t.index--),t.doPlay()}),this.next.on("click",function(){t.index==t.last?t.loop?(t.prev_index=t.last,t.next_index=t.first,t.index=t.first):(t.prev_index=t.next_index=t.last,t.index=t.last):(t.prev_index=t.index,t.next_index=t.index+1,t.index++),t.doPlay()}),this.classArrow()},doPlay:function(t){var i=this;"fade"==this.effect?(this.unit.eq(i.prev_index).fadeOut(),this.unit.eq(i.next_index).fadeIn()):(this.itemBox.dequeue().animate({left:"-"+i.obj.width()*i.next_index+"px"},i.delayAnimate),i.itemBox.animate({left:"-"+i.obj.width()*i.next_index+"px"},0)),this.navBox.children().eq(this.next_index).addClass("on").siblings().removeClass("on"),this.classArrow()},auto_play:function(){var t=this;this.autoInterval=setInterval(function(){t.next.click()},t.delayTime)},hoverStop:function(){var t=this;this.loop&&this.itemBox.add(this.prev).add(this.next).add(this.navBox).hover(function(){clearInterval(t.autoInterval)},function(){t.auto_play()})}}),t.fn[h]=function(){return this.each(function(){t.data(this,"plugin_"+h)||t.data(this,"plugin_"+h,new n(this))}),this},t(i).on("load",function(){t("[data-js-carousel]").H_carousel()})}(jQuery,window,document);