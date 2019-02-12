var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "中国省市.xls");
var data2 = data[0].data;

var _prov = [];
var _city = [];

var len = data2.length;
for (let i = 0; i < len; i ++) {
    let len2 = data2[i].length;
    for (let j = 0; j < len2; j ++) {
        if (j === 0 ) { // prov
            if (data2[i][0]) {
                var $obj = {};
                $obj["ttl"]=data2[i][0];
                $obj["relate"]='中国';
                $obj["keyword"]='省级';
                $obj["description"]='';
                _prov.push($obj);
            }
        } else { // city
            let city2=data2[i][j].split('|')[0];
            if (city2.indexOf('市')>=0) {
                city2=city2.substring(0,city2.length-1);
            }
            let des2=data2[i][j].split('|')[1] || '';
            if(city2) {
                var $obj = {};
                $obj["ttl"]=city2;
                if (data2[i][0]) {
                   $obj["relate"]='中国,'+ data2[i][0]; 
                   $obj["description"]=des2;
               } else {
                    $obj["relate"]='中国';
                    $obj["description"]='直辖市';
               }
                $obj["keyword"]='市级';
                
                _city.push($obj);
            }
        }
    }
}

// console.log(_prov);
// console.log('=======================');
// console.log(_city);
// return


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


// add(_city);


//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_place(Id,ttl,description,keyword,relate) VALUES(0,?,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].description,arr[i].keyword,arr[i].relate];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}

connection.end();
