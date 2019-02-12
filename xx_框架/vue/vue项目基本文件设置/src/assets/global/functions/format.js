export default {
  /*日期格式转换*/
  dateFormat (obj) {
    let data = '';
    if (obj) {
      let add = function(m){return m<10?'0'+m:m }
      let time = new Date(parseInt(obj));  
      let y = time.getFullYear();  
      let m = time.getMonth()+1;  
      let d = time.getDate();  
      data = y+'-'+add(m)+'-'+add(d); 
    }
    return data;
  },
  /*时间格式转换*/
  timeFormat (obj) {
    let data = '';
    if (obj) {
      let add = function(m){return m<10?'0'+m:m }
      let time = new Date(parseInt(obj));   
      let y = time.getFullYear();  
      let m = time.getMonth()+1;  
      let d = time.getDate();  
      let h = time.getHours();  
      let mm = time.getMinutes();  
      let s = time.getSeconds();  
      data = y+'-'+add(m)+'-'+add(d)+' '+add(h)+':'+add(mm)+':'+add(s); 
    }
    return data;
  }
}