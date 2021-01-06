export default {
  //判断日期类型是否为YYYY-MM-DD格式的类型
  isDate(dateVal) {
    let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    return reg.test(dateVal);
  }
};