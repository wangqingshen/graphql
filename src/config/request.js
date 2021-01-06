import vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import $envConfig from './env';

// import {
//   message
// } from 'ant-design-vue';

const vm = new vue();
window.isReresh = false;

axios.defaults.timeout = 12000; // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // post请求头的设置

// 刷新令牌
// async function refreshToken() {
//   let token = store.getters['login/token'];
//   if (!token) {
//     return;
//   }

//   let expiresTime = Number(store.getters['login/expiresTime']),
//     refreshTime = Number(store.getters['login/refreshTime']);
//   const nowTime = Math.round(new Date() / 1000);
//   if (refreshTime < nowTime) {
//     //判断token是否过期
//     if (nowTime < expiresTime) {
//       if (!window.isReresh) {
//         window.isReresh = true;
//         try {
//           let res = await getRequest('post', '/uims/uimsmanage/RefreshToken', {});
//           let {
//             token,
//             expires_time,
//             refresh_time
//           } = res;
//           store.commit('login/setToken', token);
//           store.commit('login/setExpiresTime', expires_time);
//           store.commit('login/setRefreshTime', refresh_time);
//           window.isReresh = false;
//         } catch (err) {
//           store.commit('login/logout');
//         }
//       }

//     } else {
//       store.commit('login/logout');
//     }

//   }
// }

// request interceptor
axios.interceptors.request.use(config => {
  // 可在此设置要发送的token
  // await refreshToken();
  let token = store.getters['login/token'];
  token && (config.headers.Authorization = token);
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// respone interceptor
axios.interceptors.response.use(
  response => {
    const {
      data
    } = response;
    if (data.code === 200) {
      return Promise.resolve(response);
    } else {
      // message.error(data.message || '数据请求错误');
      // if (data.code === 1013 || data.code === 1014) {
      //   store.commit('login/logout');
      // } else if (data.code === 1007) {
      //   store.commit('login/noPermission');
      // }
    }
    return Promise.reject(response);
  },
  error => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const responseCode = error.response.status;
    switch (responseCode) {
      // 401：未登录
      case 401:
        break;
        // 404请求不存在
      case 404:
        // message.error('网络请求超时');
        break;
      default:
        // message.error(error.response.statusText);
    }

    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      // message.error('请求超时，请检查网络是否连接正常');
      return;
    }

    return Promise.reject(error.response);
  });

/**
 * @description: axios RESTful 请求方法
 * @param {String} url [请求的url地址]
 * @param {String} method [请求的方式 可选值：get, delete, head | put, post,patch]
 * @param {Object} params [请求时携带的参数]
 * @return: promise
 */
export function getRequest(method = 'post', url, params = {}, baseURL = $envConfig.baseURL) {
  let urlStr = vm.$ylFunc.buildRestfulParams(url, params);
  let data = params;
  let state = store.getters['login/token'];
  if (method === 'get' || method === 'delete' || method === 'head') {
    urlStr = urlStr + '?' + qs.stringify(params);
    if (state && qs.stringify(params).indexOf('c_id') === -1) {
      urlStr += '&c_id=' + store.getters['login/cId'];
    }
  } else {
    if (state) {
      urlStr += '?c_id=' + store.getters['login/cId'];
    }
  }
  let axiosData = {
    method: method.toUpperCase(),
    url: urlStr,
    data,
    baseURL: baseURL
  };
  // 如果是七牛云，就替换掉
  if (urlStr.indexOf('config/api/storage') !== -1) {
    axiosData.baseURL = $envConfig.baseURL;
  }
  return new Promise((reslove, reject) => {
    axios(axiosData)
      .then(res => {
        reslove(res.data);
      }).catch(err => {
        reject(err);
      });
  });
}

export default getRequest;