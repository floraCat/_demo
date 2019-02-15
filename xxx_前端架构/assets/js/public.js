
// 命名空间
window.Funs = {}


// 本地cookie
Funs.setCookie = function(name,value){
	var Days = 0.1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
Funs.getCookie = function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
Funs.delCookie = function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=Funs.getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}




/*日期格式化*/
Funs.formatDate = function(stamp) {
	let data = '';
        let add = function(m){return m<10?'0'+m:m }
        let y = stamp.getFullYear(); 
        let m = stamp.getMonth()+1;  
        let d = stamp.getDate();  
        data = y+'-'+add(m)+'-'+add(d); 
        return data;
}


// 获取日期 & 时间
Funs.getDate = function (date,type,addDay) {
    let _addDay = addDay ? addDay : 0
    date = new Date(date.getTime() + _addDay*24*60*60*1000)
    let _spec = function(m){return m<10?'0'+m:m }
    let y = date.getFullYear();  
    let m = date.getMonth()+1;  
    let d = date.getDate();  
    if (type === 'date') { // 日期
        return y+'-'+_spec(m)+'-'+_spec(d);
    }
    if (type === 'timeStart') { // 时间0点
        return y+'-'+_spec(m)+'-'+_spec(d)+' 00:00'; 
    }
    if (type === 'timeEnd') { // 时间24点
        return y+'-'+_spec(m)+'-'+_spec(d)+' 23:59'; 
    }
    if (type === 'time') { // 时间
        let HH = date.getHours(); 
        let MM = date.getMinutes(); 
        let SS = date.getSeconds();
        return y+'-'+_spec(m)+'-'+_spec(d)+' '+_spec(HH)+':'+_spec(MM)+':'+_spec(SS); 
    }
}