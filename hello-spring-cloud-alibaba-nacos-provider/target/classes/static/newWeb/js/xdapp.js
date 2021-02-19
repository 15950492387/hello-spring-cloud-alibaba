
const xdapp ={
	"baseurl":"http://172.16.25.178/xd/",
	//"baseurl":"/xd/",
	"appversion":"1.1",
}
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,                 //月份
		"d+": this.getDate(),                    //日
		"h+": this.getHours(),                   //小时
		"m+": this.getMinutes(),                 //分
		"s+": this.getSeconds(),                 //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds()             //毫秒
	}
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	// console.log("fmt");
	return fmt;
}
// 下载文件方法 
var downloadDocOne = function(content, filename) { 
	var eleLink = document.createElement('a'); 
	eleLink.download = filename; 
	eleLink.style.display = 'none'; 
	// 字符内容转变成blob地址 
	var blob = new Blob([content]); 
	eleLink.href = URL.createObjectURL(blob); 
	// 自动触发点击 
	document.body.appendChild(eleLink); 
	eleLink.click(); 
	// 然后移除 
	document.body.removeChild(eleLink); 
}; 


// 下载文件方法 
var downloadDocTwo = function(fileData, filename) { 
    var content = base64ToUint8Array(fileData);
    var blob = new Blob([content]); 
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        if (!url) {
            url = window.webkitURL.createObjectURL(blob);
        }
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}; 
        
//base64字符串转array
var base64ToUint8Array = function(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
       const base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/');
       const rawData = window.atob(base64);
       const outputArray = new Uint8Array(rawData.length);
       for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
       }
       return outputArray;
}

document.write('<script src="'+xdapp.baseurl+'app/xdcomm/js_'+xdapp.appversion+'/init.js"></script>');

function loadmodule(url){
	 for(var i=0; i<url.length; i++){
		 document.write('<script src="'+xdapp.baseurl+'app/xdcomm/js_'+xdapp.appversion+'/components/'+url[i]+'"></script>');
	 }
}