
//require配置
var requireConf={

    baseUrl:'lib',

    paths:{
        /*--js库/插件--*/
        'vue':'vue.min',
        'vuex':'vuex',
        'jquery':'jquery-3.2.1.min',
        'funs':'../js/functions',
        'jedate':'jedate/jquery.jedate.min',
        'zclip':'zclip/jquery.zclip.min',
        'masonry':'jquery.masonry.min',
        /*--状态管理--*/
        'store':'../store/index',
        /*--组件--*/
        'dateFilter':'../components/dateFilter',
        'search':'../components/search',
        'pagination':'../components/pagination',
        'pop_modify':'../components/pop_modify',
        'pop_examine':'../components/pop_examine',
    },
    
    shim:{
        'vue':{ exports:'vue'},
        'vuex':{ exports:'vuex'},
        'masonry':{ deps:['jquery']},
        'zclip':{ exports:'zclip',deps:['jquery']},
    }

}

var API={
    baseData : "data/page1.txt",
    examineInfo : "data/examine_info.txt",

    libQuestion : "data/question/index.txt",
    libAd : "data/ad/index.txt",
    libVideo : "data/video/index.txt",
    libHtml5 : "data/html5/index.txt"
};

