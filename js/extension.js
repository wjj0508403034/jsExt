/*
 * Extension for String
 */
String.prototype.toInt = function() {
  return parseInt(this);
}

String.prototype.toFloat = function(num) {
  var temp = parseFloat(this);
  if (num) {
    var decimal = Number(num);
    if (isNaN(decimal)) {
      throw num + " is not integer"
    }

    return parseFloat(temp.toFixed(decimal));
  }

  return temp;
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

/*
 * Extension for Number
 */
Number.prototype.toInt = function() {
  return parseInt(this);
}

Number.prototype.isInt = function() {
  return this == this.toInt();
}

/*
 * Extension for Date
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) {
  var map = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var it in map) {
    if (new RegExp("(" + it + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (map[it]) : (("00" + map[it]).substr(("" + map[it]).length)));
    }
  }
  return fmt;
}

Date.prototype.addSeconds = function(seconds) {
  var value = this.valueOf();
  value += 1000 * seconds;
  return new Date(value);
}

Date.prototype.addMinutes = function(minutes) {
  var value = this.valueOf();
  value += 60000 * minutes;
  return new Date(value);
}

Date.prototype.addHours = function(hours) {
  var value = this.valueOf();
  value += 3600000 * hours;
  return new Date(value);
}

Date.prototype.addDays = function(days) {
  var value = this.valueOf();
  value += 86400000 * days;
  return new Date(value);
}

Date.prototype.addMonths = function(months) {
  var value = new Date(this.valueOf());

  var mo = this.getMonth();
  var yr = this.getYear();

  mo = (mo + num) % 12;
  if (0 > mo) {
    yr += (this.getMonth() + months - mo - 12) / 12;
    mo += 12;
  } else
    yr += ((this.getMonth() + months - mo) / 12);

  value.setMonth(mo);
  value.setYear(yr);
  return value;
}