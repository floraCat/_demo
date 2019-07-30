// 头部 header

//require define 函数 start
define(['vue'], function(Vue) {


    //数据
    var data = {
        list: [{
            name: "首页",
            url: "./index.html",
        }, {
            name: "博客",
            url: "http://taoquns.com"
        }, {
            name: "微博",
            url: "http://weibo.com/1654438844/profile?topnav=1&wvr=6"
        }, {
            name: "简书",
            url: "http://www.jianshu.com/users/633b8f612f8e/latest_articles"
        }, {
            name: "作品展示",
            url: "http://taoquns.com/mypage"
        }],
    };

    //定义组件 模板 数据 方法
    var header = Vue.extend({
        template: '<div class="header">\
                        <div class="header-main">\
                            <ul>\
                                <li v-for="i in list">\
                                    <a v-bind:href="i.url">\
                                        {{i.name}}\
                                    </a>\
                                </li>\
                            </ul>\
                        </div>\
                    </div>',

        data: function() {
            return data;
        },

        methods: {
            show: function() {

            }
        },
    });


    // 注册组件标签 <tq-header> 绑定组件
    Vue.component('tq-header', header);

    //实例化
    new Vue({
        el: '.header'
    });
});
//require define 函数 end