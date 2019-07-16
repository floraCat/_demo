NormalMenu  构造函数接受参数()

e.g.
实例化菜单
this.menu = new Utils.NormalMenu();

呼出菜单
this.menu.initMenu(event: Event, menu: MenuItem[]).then(({operation, argument}}) => {
   
});

interface MenuItem {
    name: string;
    icon: string;
    operation: string;
    argument: string;
    children: MenuItem[];
}


ps: icon只支持使用svg sprite图标


--------------------------------------------

示例：

Vue.prototype.$menu = new NormalMenu();
组件调用： 
const _menu = {
    name: 111,
    children: {
        name: 222
    }
}
this.$menu.initMenu(e,_menu).then(({ operation, argument }) => {
  this[operation] && this[operation](data, argument);
}).catch(err => {
  console.log(err);
});
