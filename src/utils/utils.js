import dayjs from 'dayjs';

export default {
  // 随机生成n位随机数
  getRandStr(n) {
    let str = '';
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10).toString();
    }
    return str;
  },

  // 获取当前时间
  getCurTime() {
    let date = new Date(),
      y = date.getFullYear().toString().substr(2),
      m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
      d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
      h = date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : (date.getHours() % 12).toString(),
      i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString();
    return (y + m + d + h + i + s);
  },

  // 获取url参数
  parseQueryString(str) {
    let srtChar = str;
    if (srtChar.includes('?')) {
      let str = srtChar.split('?')[1],
        temp = str.split('&'),
        result = {};
      for (let i = 0; i < temp.length; i++) {
        let temp2 = temp[i].split('=');
        result[temp2[0]] = temp2[1];
      }
      return result;
    } else {
      return false;
    }
  },

  // 获取cookie
  getCookie(k) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const arr = cookies[i].split('=');
      if (arr[0] === k) {
        return decodeURI(arr[1]);
      }
    }
  },

  // 设置cookie
  setCookie(k, v, t = 24) {
    const oDate = new Date();
    oDate.setHours(oDate.getHours() + t);
    document.cookie = k + '=' + v + ';expires=' + oDate.toUTCString() + ';path=/';
  },

  // 删除cookie
  delCookie(k) {
    this.setCookie(k, '', -1);
  },

  // 判断是否为方法
  isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
  },

  // 判断是否是对象
  isObject(func) {
    return Object.prototype.toString.call(func) === '[object Object]';
  },

  // 判断是否是数组
  isArray(func) {
    return Object.prototype.toString.call(func) === '[object Array]';
  },

  // 动态的将px转换成rem单位
  pxtorem(val) {
    return parseFloat(val) / 16 + 'rem';
  },

  /**
   *
   * 参数值String day 返回今日的时间范围
   * 参数值String week 返回本周的时间范围
   * 参数值String month 返回本月的时间范围
   * 参数值String prevMonth 返回上月的时间范围
   * 参数值String season 返回本季度的时间范围
   * 参数值String prevSeason 返回上季度的时间范围
   * 参数值String year 返回本年度的时间范围
   * 参数值String prevYear 返回本年度的时间范围
   */
  timeRange(timeType) {
    let startTime;
    let endTime;
    switch (timeType) {
      case 'day':
        startTime =
          dayjs()
          .startOf('day')
          .format('YYYY-MM-DD') + ' 00:00:00';
        endTime = dayjs().format('YYYY-MM-DD') + ' 23:59:59';
        break;
      case 'week':
        startTime =
          dayjs()
          .startOf('week')
          .format('YYYY-MM-DD') + ' 00:00:00';
        endTime = dayjs().format('YYYY-MM-DD') + ' 23:59:59';
        break;
      case 'month':
        startTime =
          dayjs()
          .startOf('month')
          .format('YYYY-MM-DD') + ' 00:00:00';
        endTime = dayjs().format('YYYY-MM-DD') + ' 23:59:59';
        break;
      case 'prevMonth':
        startTime =
          dayjs()
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYY-MM-DD') + ' 00:00:00';
        endTime =
          dayjs()
          .subtract(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD') + ' 23:59:59';
        break;
      case 'year':
        startTime =
          dayjs()
          .startOf('year')
          .format('YYYY-MM-DD') + ' 00:00:00';
        endTime = dayjs().format('YYYY-MM-DD') + ' 23:59:59';
        break;
    }
    return [startTime, endTime];
  },

  // 对字符串进行加密
  compileStr(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  },

  // 字符串进行解密
  uncompileStr(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  }
};