

async & Generator 比较：
----------------------------------------------
- async是Generator函数的语法糖
- async函数完全可以看作多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖


	var fs = require('fs');
	var readFile = function (fileName) {
	  return new Promise(function (resolve, reject) {
	    fs.readFile(fileName, function(error, data) {
	      if (error) reject(error);
	      resolve(data);
	    });
	  });
	};
	// Generator的写法：
	var gen = function* () {
	  var f1 = yield readFile('/etc/fstab');
	  var f2 = yield readFile('/etc/shells');
	};
	// 写成async函数就变成：
	var asyncReadFile = async function () {
	  var f1 = await readFile('/etc/fstab');
	  var f2 = await readFile('/etc/shells');
	};


##############################################################


(2)Async 比 (1)Generator 好的地方：
------------------------------------
- 更好的语义
- 内置执行器：
	(1)的执行是xxx.next()，
	而(2)自带执行器，他的执行与普通函数一模一样
- 更广的适用性：
	yield命令后只能是Thunk函数或Promise对象
	await命令后可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
- 返回值是Promise：
	（1）返回的是Iterator对象
	（2）返回的是Promise对象，可以用then方法指定下一步的操作


