/**
 * 隐藏姓名 手机号 身份证 银行卡 等中间字符信息
 * @param str
 * @returns {*}
 */
export function star(value) {
  let str = value.toString();
  if (str.length > 0 && str.length < 3) {
    return '*' + str.substring(1);
  } else if (str.length > 5 && str.length < 12) {
    return str.substr(0, 3) + '****' + str.substr(-4);
  } else if (str.length > 14) {
    return str.substr(0, 4) + '***********' + str.substr(-4);
  } else {
    return str;
  }
}