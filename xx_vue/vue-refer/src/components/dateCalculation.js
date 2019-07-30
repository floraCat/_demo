export function getDate(val) {
    if (val != null) {
        let date = new Date(val);
        let _hours = date.getHours()<10?'0'+date.getHours():date.getHours();
        let _minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        let _seconds = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
        return date.getFullYear() +
            '-' + (date.getMonth() + 1) +
            '-' + date.getDate() +
            ' ' + _hours +
            ':' + _minutes +
            ':' + _seconds;
    }
}

export function calculateDay(type, count, targetDate) {
    if (type === 'add') {
        targetDate.setDate(targetDate.getDate()+count);
    }
    if (type === 'reduce') {
        targetDate.setDate(targetDate.getDate()-count);
    }
    let y = targetDate.getFullYear();
    let m = (targetDate.getMonth()+1)<10?'0'+(targetDate.getMonth()+1):(targetDate.getMonth()+1);
    let d = targetDate.getDate()<10?'0'+targetDate.getDate():targetDate.getDate();
    return y+'-'+m+'-'+d;
}

export function getDayCount (_startDate,_endDate) {
    let diff = new Date(_endDate).getTime() - new Date(_startDate).getTime();
    return Math.floor(diff / 1000 / 60 / 60 / 24);
}