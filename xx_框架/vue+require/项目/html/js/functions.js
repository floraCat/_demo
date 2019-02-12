
//公共方法

define(['vue','jquery'],function(Vue,$){

    return Funs={

        //异步工具方法
        ajax:function(type,url,data,callback){
            $.ajax({
                url:url,
                type:type,
                dataType: "json",
                data:data,
                success:function(rs){
                    $(".pMask").fadeOut();
                    if(callback && typeof(callback)=="function"){
                        callback(rs);
                    }
                },
                error:function(rs){
                    alert("搜索出错！错误信息："+rs);
                },
                beforeSend:function(){
                    $("body").append('<div class="pMask"></div>');
                }
            });
        },

        //异步请求数据
        ajaxGet:function(url,data,callback){
            this.ajax('GET',url,data,callback);
        },
        //异步提交数据
        ajaxPost:function(url,data,callback){
            this.ajax('POST',url,data,callback);
        }

    };

});

    
