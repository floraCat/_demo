require.config({
    baseUrl:'lib',
    shim:{
        'vue':{
            exports:'vue'
        }
    },
    paths:{
        'vue':'../lib/vue',
        'header':'../vue-module/tq-header',
        'footer':'../vue-module/tq-footer'
    },
});

require(['vue','header','footer'],function(vue,header,footer){

});