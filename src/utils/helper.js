import strings from "../assets/strings";

export function inSize(w, h, ...sizes) {
    return sizes.indexOf(`${w}x${h}`) > -1
}

//单位 分 -> 元
export function formatPrice(price) {
    return strings.getCurrency(price / 100)
}

export function priceFromDatabase(price) {
    if (price == undefined) {
        return 0.00;
    }
    return (price / 100).toFixed(2);
}

export function priceToDatabase(price) {
    let numPrice = parseFloat(price);
    return Math.round(numPrice * 100);
}

export function ratioToDatabase(ratio) {
    let numPrice = parseFloat(ratio);
    return parseFloat((numPrice * 100).toFixed(2));
}

export function formatElectrical(value) {
    return (value / 1000).toFixed(3);
}

export function getImageUrl(text) {   
    if(!text){
        return "";
    }
    if (text.endsWith('.jpg') || text.endsWith('.png')) {
        return text
    }
    return text + '-200x200.jpg'
}

export function getImageDataUrl(url){
    if (url.indexOf('-200x200')>0) {
        return url.replace(/200x200/, "500x500")
    }
    return url
}

export function timeString(time) {
    let date = new Date(time * 1000);

    //return date.toLocaleString('zh-CN', {hour12: false})
    return date.Format('yyyy-MM-dd hh:mm:ss')
}

export function getString(template, ...pattern) {
    let result = strings.getString(template)
    if (pattern.length == 0) {
        return result;
    }
    return result.replace(/{(\d+)}/g, (match, number) => pattern[number] !== undefined ? pattern[number] : match)
}

export function setColumnsWidth(columns) {
    let width =  100 / columns.length ;
    columns.map(function(columns){
        columns.width = width+'%'
    })
    return columns;
}

/**
 * 替换url {0}为id
 */
export function getReplUrl(url,id){
    var str = url;
    var str1 = str.replace('{0}', id);
    return str1;
}

/**
 * 初始图表时间
 */
export function settingsDate(){   
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth()+1;
    // const quarter = Math.floor( ( date.getMonth() % 3 == 0 ? ( date.getMonth() / 3 + 1 ) : ( date.getMonth() / 3 + 1 ) ) );
    // const day = date.getDate();
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth()+1 ;
    let day = date.getDate() ;
    day = day < 10 ? '0'+day : day;
    month = month <10 ? '0' + month : month;
    const startDay = year+'-'+month+'-'+'01';
    const endDay = year+'-'+month+'-'+day;
    return {startDay:startDay,endDay:endDay};
}


    /**
 * 时间格式
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 导出下载*/
export function exportUrl(data){
    if (!data.code) {
        window.location.href=data.url;
    }
}

/**
 * 返回顶部
 */
export function scrollTop(){
    document.querySelector(".ant-layout-content").scrollTop = 0;
}