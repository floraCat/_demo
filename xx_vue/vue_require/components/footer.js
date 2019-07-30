// 尾部 footer 
// require.js define() 函数包裹
define(['vue'], function(Vue) {

    //vue 组件
    /*
     * template html模板文件
     * data 数据 返回函数中返回对象
     * methods 方法集合
     */
     
    // 定义组件内容，数据，方法
    var footer = Vue.extend({

        template: 
        '<div class="footer">\
            <div class="footer-main">\
                <p>taoqun个人博客 | 记录 | 展示 | 使用vue\
                    <a href="mailto:taoquns@foxmail.com">联系我：email</a>\
                </p>\
            </div>\
        </div>',

        data: function() {
            return {
                name: 'function'
            }
        },

        methods: {
            show: function() {
                alert(this.name);
            }
        }

    });

    // 注册组件的标签 <tq-footer> 绑定组件
    Vue.component('tq-footer', footer);

    //实例化
    new Vue({
        el: '.footer',
    });

    //vue组件结束

});
//define end
//define end