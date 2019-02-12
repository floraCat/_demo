
------------------------------------------------factory---

angular.module('myApp')
.factory('githubService', ['$http', function($http) {
	return {
		getUserEvents: function(username) {
		// ...
		}
	};
}]);

------------------------------------------------service---

var Person = function($http) {
	this.getName = function() {
		return $http({ method: 'GET', url: '/api/user'});
	};
};
angular.service('personService', Person);

------------------------------------------------provider---

angular.module('myApp', [])
.provider('githubService', function($http) {
	// 默认的，私有状态
	var githubUrl = 'https://github.com'
	setGithubUrl: function(url) {
		// 通过.config改变默认属性
		if (url) { githubUrl = url }
	}，
	method: JSONP, // 如果需要，可以重写
	$get: function($http) {
		self = this;
		return $http({ method: self.method, url: githubUrl + '/events'});
	}
});
angular.module('myApp', [])
.config(function(githubServiceProvider) {
	githubServiceProvider.setGithubUrl("git@github.com");
});


如果希望在config()函数中可以对服务进行配置，必须用provider()来定义服务