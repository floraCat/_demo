$(function(){

        //copyRight howe
        newShop();


        /* 会员签到  start*/
        $.pushing = false;
        $.ajax({
            'url' : 'index.php/Site/HasSignUp',
            'type': 'get',
            'dataType' : 'json',
            'success' : function(json_data){;
                if(json_data.rs){
                    if(!json_data.val){
                        $(".MemIndex .P2").html('<p class="P2">快来<a id="SignIndex" class="em CanSign" href="javascript:;" style="color: red">签到</a>拿积分！</p>');
                    }else{
                        $(".MemIndex .P2").text("今日已签到");
                    }
                }
            }
        });
        $(document).on('click', '.CanSign', function(){
            if($.pushing){
                $.Mytips({'title' : '请勿重复提交'});
                return;
            }
            $.pushing = true;
            $.ajax({
                'url' : 'index.php/Site/SignUp',
                'type' : 'get',
                'dataType' : 'json',
                'success' : function(json_data){
                    if(json_data.rs){
                        $.gDialog({
                            dialog:'#noteSign',
                            attr:'note_setTime',
                            text:'今日签到成功！<br>恭喜您获得2个积分',
                            time:2000,
                            timeNote:false,
                            mask:"h_maskB2",
                            ok:function(){
                                //php操作
                                $(".MemIndex .P2").text("今日已签到");
                                $(".MemIndex .Btns").hide().siblings(".Enter").show();
                            }
                        });
                    }
                    $.pushing = false;
                }
            });
        });
        /* 会员签到  end*/

        /*云购*/
        $(".join").bind('click',function(){
            var hrefJump=$(this).data('url')+"/num/"+$(this).siblings("ol").find('input').val();
            window.open(hrefJump);
        });

        /*店主上新*/
        $(".Rfnews").bind("click",function(){
            newShop();
        });



        /*店铺选择存cookie(start)*/
        $(".city").click(function(){
            if(!$.cookie('idKey')){
                $.cookie('idKey', $(this).data('key'), { expires: 7, path: '/' });
                $.cookie('shopName', $(this).text(), { expires: 7, path: '/' });
            }
        });
        /*店铺选择存cookie(end)*/
        //end(howe)

     //全轮播箭头显隐
    $(".HFocus,#HSlides1").hover(function(){$(this).find(".arrow").toggleClass("on")});
    //侧栏右弹出
    $(".HSnav .Lis li").mouseover(function(){
        $(".HSnav_show .Unit").eq($(this).index()).show();
        $(this).addClass("on");
    });
    $(".HSnav_show .Unit").mouseover(function(){
        $(".HSnav .Lis li").eq($(this).index()).addClass("on");
        $(this).show();
    });
    $(".HSnav .Lis li").mouseout(function(){
        $(this).removeClass("on");
        $(".HSnav_show .Unit").eq($(this).index()).hide();
    });
    $(".HSnav_show .Unit").mouseout(function(){
        $(this).hide();
        $(".HSnav .Lis li").eq($(this).index()).removeClass("on");
    });


    //数量加减[1分云购]
    $(".HNum").delegate(".Sub","click",function(){
        var val_num=$(this).siblings("input").val();
        if(val_num<=0){
            $(this).siblings("input").val("0");
        }else{
            $(this).siblings("input").val(val_num-1);
        }
    });
    $(".HNum").delegate(".Add","click",function(){
        var val_num=$(this).siblings("input").val();
        var sum_num=2100;//最大值
        if(val_num>=sum_num){
            $(this).siblings("input").val(sum_num);
        }else{
            $(this).siblings("input").val(eval(val_num)+1);
        }
    });


    //楼层二级切换
    $(".HdIndex4 .Com").addClass("on");
    $(".HdIndex4 ol").delegate('li','mouseover',function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        $(this).parents(".HFloor").find(".HdIndex4 .Com").removeClass("on");
        $(this).parents(".HFloor").find(".HLayout2 .HList3").hide().eq($(this).index()).show();
        $(window).scroll();
    });
    $(".HdIndex4").delegate(".Com","mouseover",function(){
        $(this).addClass("on");
        $(this).parents(".HFloor").find(".HLayout2 .HList3").hide();
        $(this).parents(".HFloor").find(".HdIndex4 ol li").removeClass("on");
    });

    //楼层浮动左栏
    $(window).scroll(function(){
        /*if( pageScroll() > $(".HFloor6").offset().top-300 ){
            if($(".FloorTabs").is(':hidden')){$(".FloorTabs").fadeIn();$(window).scroll();}
            $(".FloorTabs a").eq(5).addClass("cur").siblings("a").removeClass("cur");
        }else if( pageScroll() > $(".HFloor5").offset().top-300 ){
            if($(".FloorTabs").is(':hidden')){$(".FloorTabs").fadeIn();$(window).scroll();}
            $(".FloorTabs a").eq(4).addClass("cur").siblings("a").removeClass("cur");
        }else if( pageScroll() > $(".HFloor4").offset().top-200 ){
            if($(".FloorTabs").is(':hidden')){$(".FloorTabs").fadeIn();$(window).scroll();}
            $(".FloorTabs a").eq(3).addClass("cur").siblings("a").removeClass("cur");
        }else  */if( pageScroll() > $(".HFloor3").offset().top-200 ){
            if($(".FloorTabs").is(':hidden')){$(".FloorTabs").fadeIn();$(window).scroll();}
            $(".FloorTabs a").eq(2).addClass("cur").siblings("a").removeClass("cur");
        }else if( pageScroll() > $(".HFloor2").offset().top-200 ){
            if($(".FloorTabs").is(':hidden')){$(".FloorTabs").fadeIn();$(window).scroll();}
            $(".FloorTabs a").eq(1).addClass("cur").siblings("a").removeClass("cur");
        }else if( pageScroll() > $(".HFloor1").offset().top-200 ){
            $(".FloorTabs a").eq(0).addClass("cur").siblings("a").removeClass("cur");
            $(".FloorTabs").fadeIn();
        }else{
            $(".FloorTabs").stop().hide();
        }
    });
    $(".FloorTabs a").hover(function(){
        $(this).toggleClass("on");
    });
    $(".FloorTabs").delegate("a","click",function(){
        $(this).addClass("cur").siblings("a").removeClass("cur");
    });
    $(".FloorTabs .Gotop").delegate('','click',function(){
        $("html,body").animate({scrollTop:"0px"},200);
    });

    //底部社区标题切换
    $(".ListBtm1").delegate("a","mouseover",function(){
        $(this).addClass("on").siblings("a").removeClass("on");
    });

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


//倒计时
$(function(){

    //开抢切换[夜抢好货]
    $(".ListTab1 .H_keys").delegate("li","mouseover",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        var i=$(this).index();
        $(".TimeIndex ol").eq(i).show().siblings("ol").hide();
    });

    function TodayTime(AddDayCount,hour,minute) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+"/"+m+"/"+d+" "+hour+":"+minute+":00";
    }
    $("#start_11").data("countdown",TodayTime(0,19,00));//19点
    $("#end_11").data("countdown",TodayTime(0,23,00));
    $("#start_12").data("countdown",TodayTime(0,20,00));//20点
    $("#end_12").data("countdown",TodayTime(1,00,00));
    $("#start_13").data("countdown",TodayTime(0,21,00));//21点
    $("#end_13").data("countdown",TodayTime(1,01,00));

    $('p[data-countdown]').each(function () {
        var $this = $(this);
        finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<strong>%H</strong><i>：</i><strong>%M</strong><i>：</i><strong>%S</strong>'));
            /******start****/
            var cls=$(this).parent().attr("class");
            //秒杀前到开始
            if(cls.indexOf("time_before")!=-1){
                var len=$(this).find("strong").length;
                var sum="";
                for(i=0;i<len;i++){
                    var val=$(this).find("strong").eq(i).text();
                    sum+=val;
                }
                sum_=eval(sum);
                if(sum_==0){
                    $this.parent().hide();
                    $this.parents("ol").find(".time_begin").show();
                }
            }
            //开始到结束
            if(cls.indexOf("time_begin")!=-1){
                var len=$(this).find("strong").length;
                var sum="";
                for(i=0;i<len;i++){
                    var val=$(this).find("strong").eq(i).text();
                    sum+=val;
                }
                sum_=eval(sum);
                if(sum_==0){
                    $this.parents("ol").find(".time_begin span").text("已结束：");
                }
            }
            /******end****/
        });
    });
});

function newShop(){
    $.post("index.php/Site/NewShop",{},function(data){
        $(".News").remove();
        $(".NewIndex").append(data.html);
    },'json')
}

function goodShop(){
    $.post("index.php/Site/GoodShop",{},function(data){
        $(".Good").remove();
        $(".RankIndex").append(data.html);
    },'json')
}


