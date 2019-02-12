import Vue from "vue";
import Index from "./Index";
import router from "./router";

Vue.config.productionTip = false

var vm=new Vue({
	el: "#app",
	router,
	template: '<Index/>',
	components: { Index }
})

console.log(window);