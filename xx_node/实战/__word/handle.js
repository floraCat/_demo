var admZip = require('adm-zip');
var fs = require('fs');
var xlsx = require('node-xlsx');


// const zip = new admZip('__word文档/世界上只买卖一种产品.docx');
// //将该docx解压到指定文件夹result下
// zip.extractAllTo("./result", true);
// return


var data = [
    { name : '成语', data : [], find: 'w:val="green"'}, // 0 - green
    { name : '俗语', data : [], find: 'w:val="darkMagenta"'}, // 1 - darkMagenta[紫罗兰]
    { name : '用辞', data : [], find: 'w:val="yellow"'}, // 2 - yellow
    { name : '参考', data : [], find: 'w:val="cyan"'}, // 3 - cyan[青绿]
    { name : '比喻', data : [], find: 'w:val="lightGray"'}, // 4 - lightGray[灰色]
    { name : '助词', data : [], find: 'w:val="magenta"'}, // 5 - magenta[粉]
    { name : '术语', data : [], find: 'w:val="blue"'}, // 6 - blue
    { name : '其他', data : [], find: 'w:val="black"'}, // 7 - black
    { name : '素材', data : [], find: 'w:val="red"'} // 8 - red
];


var textContent = ['','','','','','','','',''];


parseWordDocument("words/世界上只买卖一种产品.docx",function () {
	// console.log(data);
	toExl (data);
});

//参数是word文件名,第二个参数是回调表示解析完成
function parseWordDocument(absoluteWordPath,callback){
	 //如果文件存在
	 fs.exists(absoluteWordPath, function(exists){
	 	if(exists){
			 //解压缩
			 const zip = new admZip(absoluteWordPath);
			 //将document.xml(解压缩后得到的文件)读取为text内容
			 var contentXml = zip.readAsText("word/document.xml");
			 //正则匹配出对应的<w:p>里面的内容,方法是先匹配<w:p>,再匹配里面的<w:t>,将匹配到的加起来即可
			 //注意？表示非贪婪模式(尽可能少匹配字符)，否则只能匹配到一个<w:p></w:p>
			 var matchedWP = contentXml.match(/<w:p.*?>.*?<\/w:p>/gi);
			 //继续匹配每个<w:p></w:p>里面的<w:t>,这里必须判断matchedWP存在否则报错
			 if(matchedWP){
			 	matchedWP.forEach(function(wpItem){

			 	var matchedWR = wpItem.match(/<w:r>.*?<\/w:r>/gi);
			 	if (matchedWR) {
			 		bgCol2(matchedWR,0);
			 	}			  
			});
			 callback()
			}
		}else{
			callback()
		}
	});
};

function bgCol2 (_wrItems,_x) {
	let _len = _wrItems.length;
	for (let i = 0; i < _len; i ++) {
		if(_wrItems[i].indexOf(data[_x].find)>=0){
			var matchedWT = _wrItems[i].match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
			if(matchedWT){
				var _curOn = '';
				matchedWT.forEach(function(wtItem){
					if(wtItem.indexOf('xml:space')===-1){
						_curOn+=wtItem.slice(5,-6);
					}else{
						_curOn+=wtItem.slice(26,-6);
					}
					textContent[_x]+=_curOn;
				});
			}
			if (i == _len-1) {
				if (textContent[_x] !== '') {
					data[_x].data.push([textContent[_x]]);
					textContent[_x] = '';
				}
			}
		} else {
			if (textContent[_x] !== '') {
				data[_x].data.push([textContent[_x]]);
				textContent[_x] = '';
			}
		}
	}
	_x ++;
	if (_x <= 8) {
		bgCol2(_wrItems,_x);
	}
}


function toExl (_data) {
    var buffer = xlsx.build(_data);
    // fs.writeFile('./数据处理源文件/es6.xlsx', buffer, function (err){
    fs.writeFile('./__excel文档/_word2.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}