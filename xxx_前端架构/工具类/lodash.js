/**
 * array去重
 * _.uniqBy(Array)、_.uniqBy(Array[Object], 'key');
*/ 
function uniqBy(value, iteratee) {
  // 空值返回[]
  if (isEmpty(value) || !isArray(value)) return [];
  
  // 根据key进行去重
  if (isString(iteratee) && !isEmpty(iteratee)) {
    const [hasArray, newArray]  = [[], []];
    
    // 遍历Array[Object]
    for (const item of value.values()) {
      // 如果存在iteratee属性
      if (!isEmpty(item[iteratee])) {
        if (hasArray.indexOf(item[iteratee]) === -1) {
          hasArray.push(item[iteratee]);
          newArray.push(item);
        }
      }
      else {
        newArray.push(item);
      }
    }
    return newArray;
  }
  
  // 直接返回去重后的数组
  return Array.from(new Set(value));
}

/**
 * _.sortBy(Array, { type: 'mix' })、_.sortBy(Array[Object], { key: 'name', type: 'min' });
 * Array type支持mix、max
 * Array[Object] 支持key、type：mix/max
*/ 
function sortBy(value, iteratee = { type: 'mix' }) {
  if (isEmpty(value)) {
    if (isArray(value)) return [];
    if (isObject(value)) return {};
    return null;
  }
  
  // Array
  if (isArray(value)) {
    let multipleType = [];
    let i, j, len = value.length;
    const type = iteratee.type === 'max' ? '<' : '>';
    
    for (const item of value.values()) {
      if (multipleType.indexOf(getPrototype(item)) === -1) multipleType.push(getPrototype(item));
    }
    
    // value 只有一种数据类型，才进行计算
    if (multipleType.length === 1) {
      if (multipleType[0] === '[object String]' || multipleType[0] === '[object Number]') {
        for (i = 0; i < len; i++) {
          for (j = i; j < len; j++) {
            if (eval(`${value[i]}${type}value[j]`)) {
              [value[i], value[j]] = [value[j], value[i]]
            }
          }
        }
        return value;
      }
      
      // Array[Object]类型排序
      else if (multipleType[0] === '[object Object]') {
        return value.sort((a, b) => {
          const value1  = a[iteratee.key];
          const value2  = b[iteratee.key];
          const greater = iteratee.type === 'max' ? '>' : '<';
          const less    = iteratee.type === 'max' ? '<' : '>';
          
          if (eval(`${value2}${greater}value1`)) return 1;
          else if (eval(`${value2}${less}value1`)) return -1;
          return 0;
        });
      }
    }
    
    // 返回原始值
    return value;
  }
}

// 判定是否为空
function isEmpty(value) {
  if (typeof value === 'undefined' || value === null || value === '') return true;
  else if (isArray(value) && value.length <= 0) return true;
  else if (isObject(value) && Object.keys(value).length <= 0) return true;
  return false;
}

// 判定是否为String
function isString(value) {
  return getPrototype(value) === '[object String]';
}

// 判定是否为Number
function isNumber(value) {
  return getPrototype(value) === '[object Number]';
}

// 判定是否为Array
function isArray(value) {
  return getPrototype(value) === '[object Array]';
}

// 判定是否为Object
function isObject(value) {
  return getPrototype(value) === '[object Object]';
}

// 判定是否为Function
function isFunction(value) {
  return getPrototype(value) === '[object Function]';
}

// 判定是否为Date
function isDate(value) {
  return getPrototype(value) === '[object Date]';
}

// 获取字符长度
function hasLength(value) {
  if (isEmpty(value) || isArray(value) || isObject(value) || isDate(value)) return 0;
  else if (!isString(value)) value += '';
  return value.length;
}

// 日期 格式化 成Unix：1566800590
function formatUnix(time = parseInt(new Date().getTime() / 1000)) {
  if (isDate(time)) return parseInt(time.getTime() / 1000);
  else if(isNumber(time) && hasLength(time) === 10) return time;
  return parseInt(new Date().getTime() / 1000)
}

// Unix/Date 格式化 成字符串日期：2019-08-26 14:23:10
function formatTime(time = getDateValue(new Date().getTime()), iteratee = 'YYYY-mm-dd H:i:s') {
  if (isDate(time)) return getDateValue(time.getTime(), iteratee);
  else if(isNumber(time) && hasLength(time) === 10) return getDateValue(time * 1000, iteratee);
  return time;
}

// 返回格式化后的时间，可根据iteratee类型返回
function getDateValue(value, iteratee = 'YYYY-mm-dd H:i:s') {
  // 格式先转成小写
  iteratee = iteratee.toLowerCase();
  const format = iteratee.includes('/') ? '/' : '-';
  
  // 转化为北京时间需要额外增加八个时区
  let date = new Date(parseInt(value + 8 * 3600 * 1000)).toJSON().substr(0, 19).replace('T', ' ');
  
  const formatNumber = n => { n = n.toString(); return n[1] ? n : '0' + n; }
  const year  = new Date(date).getFullYear();
  const month = formatNumber(new Date(date).getMonth());
  const day   = formatNumber(new Date(date).getDate());
  const h     = formatNumber(new Date(date).getHours());
  const m     = formatNumber(new Date(date).getMinutes());
  const s     = formatNumber(new Date(date).getSeconds());
  
  // 根据传入格式化类型进行返回
  switch (iteratee) {
    case `yyyy${format}mm${format}dd`:
      date = `${year}${format}${month}${format}${day}`;
      break;
    case `yyyy${format}mm`:
      date = `${year}${format}${month}`;
      break;
    case `mm${format}dd`:
      date = `${month}${format}${day}`;
      break;
    case 'h:i:s':
      date = `${h}:${m}:${s}`;
      break;
    case 'h:i':
      date = `${h}:${m}`;
      break;
    default:
      date = date.replace(/-/g, format);
  }
  return date;
}

// 获取类型
function getPrototype(value) {
  return Object.prototype.toString.call(value);
}

// 导出方法
export default {
  uniqBy,
  sortBy,
  isString,
  isNumber,
  isEmpty,
  isArray,
  isObject,
  isFunction,
  isDate,
  hasLength,
  formatUnix,
  formatTime,
}