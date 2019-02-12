
- yield一定要在*函数内，不能在嵌套的函数内



-------------------------

function* eee () {
	yield 'a';
	yield 'b';
	return 'c';
}
var rrr = eee();
rrr.next(); // 'a'
rrr.next(); // 'b'
rrr.next(); // 'c'

--------------------------

function* xxx (max) {
	for (var x = 0; x < max; x ++) {
		yield x + 1;
	}
}
var zzz = xxx(10);
zzz.next();
zzz.next();
...

// for of 遍历
for (var x of xxx(10)) {
	console.log(x)
}
// 最后返回undefined是因为没有遇到return

---------------------------

function* next_id(){
    let current_id =0;
    while(true) {
        current_id++;
        yield current_id;
    }
}
var id = next_id();
id.next();
id.next();
...

































