/*
** async / await 的写法
*/
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function print(value) {
  await timeout(2000);
  console.log(value);
}

print('xxx');

--------------------------------- vs ----------------

/*
** Promise 的写法
*/
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

function print(value) {
  console.log(value);
}

timeout(2000).then(() => {
	print('xxx');
});


##############################################################

/*
** async / await 的写法
*/
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function print(ms,value) {
  await timeout(ms);
  console.log(value);
}

print(2000,'xxx');

--------------------------------- vs ----------------

/*
** Promise 的写法
*/
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

function print(ms,value) {
	timeout(ms).then(() => {
		console.log(value);
	});
}

print(2000,'xxx');
	

######################################################### 传参 #####

/*
** async / await 的写法
*/
function timeout() {
  return new Promise(resolve => {
    setTimeout(function () {
      var _x = 'xxx';
      resolve(_x);
    }, 2000);
  })
}

async function print() {
  await timeout().then((_rs) => { // then()只是为了获取传参
    console.log(_rs); // xxx
  });
}

print();

--------------------------------- vs ----------------

/*
** Promise 的写法
*/
function timeout() {
  return new Promise(resolve => {
    setTimeout(function () {
      var _x = 'xxx';
      resolve(_x);
    }, 2000);
  })
}

function print() {
  timeout().then((_rs) => {
    console.log(_rs); // xxx
  });
}

print();
  

##############################################################

async/await比promise好的原因：https://blog.csdn.net/xufeiayang/article/details/80484116