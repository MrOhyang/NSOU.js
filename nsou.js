(function(){

	var NS = function(){};

	/*
	* 判断 arr 数组 有没有存在 num
	* 
	* author: 欧阳逸滨
	* date: 2015-8-14 17:23:32
	*/
	NS.prototype.findArrays = function(num, arr) {
		for( var i in arr ){
			if( arr[i] == num ){
				return true;
			}
		}
		return false;
	};

	/*
	* 判断 a,b 两个数组里面的元素是否全部相等。
	*
	* author: 欧阳逸滨
	* date: 2015-8-13 18:36:20
	*/
	NS.prototype.equalArrays = function(a, b){
		if( a.length != b.length )
			return false;
		for( var i=0 ; i<a.length ; i++ ){
			if( a[i] !== b[i] )
				return false;
		}
		return true;
	};

	/*
	* _key 为名，_value 为值，_spedn 为存在时间，_str 为单位
	* 设置一个 任意一生存周期的 Cookie 。
	*
	* author: 欧阳逸滨
	* date: 2015-8-13 18:37:49
	*/
	NS.prototype.SetCookie = function(_key, _value, _spend, _str){
		if(_key != ""){
			var date = new Date();
			var expireT = 0;
			switch(_str.toLowerCase()){
			case "s":
				expireT = _spend * 1000;
				break;
			case "m":
				expireT = _spend * 60 * 1000;
				break;
			case "h":
				expireT = _spend * 3600 * 1000;
				break;
			case "d":
				expireT = _spend * 24 * 3600 * 1000;
				break;
			default:
				alert("SetCooke error.");
				break;
			}
			date.setTime(date.getTime()+expireT);
			document.cookie = _key + "=" + escape(_value) + ";expires=" + date.toGMTString();
		}
	};

	/*
	* 读取 Cookie 的 key value
	*
	* author: 欧阳逸滨
	* date: 2015-8-13 19:29:58
	*/
	NS.prototype.GetCookie = function(_key){
		var list = document.cookie.split("; ");
		for( var i in list ){
			var index = list[i].search(/\=/);
			if( list[i].substring(0,index) == _key )
				return unescape(list[i].substring(index+1));
		}
		return null;
	}

	NS.prototype.GetNowTime = function(){
		var Time = new Date();
		/*
		* .getFullYear() = 年
		* .getMonth()+1 = 月
		* .getDate() = 日
		* .getDay() = 周几，[0]=>日，[1]=>一，[6]=>六
		*/
		return ( Time.getFullYear() + '/' + (Time.getMonth()+1) + '/' + Time.getDate() );
	};

	/*
	* str 截取长度为 len
	*
	* author: 欧阳逸滨
	* date: 2015-8-13 19:11:44
	*/
	NS.prototype.MySubStr = function(str, len){
		var len2 = len;
		var str2 = "";
		var ch = '';
		var flag = 0;
		for( var i=0;i<len && !!str.charAt(i);i++ ){
			ch = str.charAt(i);
			str2 += ch;
			// if( this.MyStrMatch(ch,"numchar`~!@#$%^&*()-_=+[{]};:\'\"\\|,<.>/?") ){
			if( /[\w\`\~\!\@\#\$\%\&\_\+\-\*\=\:\;\'\"\\\|\/\(\)\[\]\{\}\<\^\>\,\.\?]/.test(ch) ){
				flag++;
				if( flag%2==0 ){
					len++;
				}
			}
		}
		if( i>=len )
			str2 += "...";
		return str2;
	}

	window.NSOU = new NS();

})();


/*
* 以下内容为待整理。************** ↓↓
*/

// 判断浏览器是否支持LocalStorage ，如果支持，将信息存入LocalStorage ，负责存入cookie
// 仅作字符串存贮，存入cookie时默认存入'/'path下，如果有特使要求可以传递参数

var localInfo = {
	set: function(key, value, cookieInfo) {
		var isLocalStorage = localInfo.getIsLocalStorage();
		if (isLocalStorage) {
			//当前浏览器支持localStorage
			var storage = window.localStorage;
			storage.setItem(key, value);
		} else {
			//当前浏览器不支持localStorage，将信息存入cookie
			var path = '/'
			var expires = localInfo.getExpires();
			if (cookieInfo) {
				path = cookieInfo.path || '/';
				expires = cookieInfo.expires || expires;
			}
			document.cookie = key + '=' + escape(value) + ';expires=' + expires + ';Path=' + path;
		}
	},
	get: function(key) {
		var isLocalStorage = localInfo.getIsLocalStorage();
		if (isLocalStorage) {
			//当前浏览器支持localStorage
			var storage = window.localStorage;
			return storage.getItem(key);
		} else {
			//当前浏览器不支持localStorage，将信息存入cookie
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if (arr[0] == key)
					return unescape(arr[1]);
			}
			return "";
		}
	},
	remove: function(key, cookieInfo) {
		var isLocalStorage = localInfo.getIsLocalStorage();
		if (isLocalStorage) {
			//当前浏览器支持localStorage
			var storage = window.localStorage;
			storage.removeItem(key);
		} else {
			//当前浏览器不支持localStorage，将信息存入cookie
			var path = '/'
			if (cookieInfo) {
				path = cookieInfo.path || '/';
			}
			document.cookie = key + '="";expires=-1;Path=' + path;
		}
	},
	getIsLocalStorage: function() {
		return !!window.localStorage;
	},
	getExpires: function() {
		var date = new Date();
		var expiresDays = 1000;
		date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
		var expires_time = date.toGMTString();
		return expires_time;
	}
};