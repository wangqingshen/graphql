import vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import {
  getRequest
} from '@/config/request';
import api from '@/api';
import $ylFunc from 'yl-func';
import $ylValidator from 'yl-validator';
import * as ylFilters from 'yl-filter';
import * as filters from '@/filters';
import $envConfig from '@/config/env';
import '@/directive/index';
import '@/router/permission';
import Antd from 'ant-design-vue';
import('ant-design-vue/dist/antd.css');
import * as Sentry from '@sentry/browser';
import {
  Vue as VueIntegration
} from '@sentry/integrations';
import {
  Integrations
} from '@sentry/tracing';
import {
  ApolloClient
} from 'apollo-client';
import {
  HttpLink
} from 'apollo-link-http';
import {
  InMemoryCache
} from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

vue.config.productionTip = false;
vue.prototype.$getRequest = getRequest;
vue.prototype.$api = api;
vue.prototype.$ylFunc = $ylFunc;
vue.prototype.$ylValidator = $ylValidator;
vue.prototype.$envConfig = $envConfig;

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  /* 其中./v1是我在vue的config中配置时解决跨域时起的代理一个名字，后面的是后端
  暴露接口方法的地址 */
  credentials: 'same-origin',
  /* 这个属性的意思是在同源的情况下携带cookie,因为vue-apollo本身发送的是一个fetch请求，所以在发送请求时不会自动携带cookie，所以我们需要加上此属性 */
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

vue.use(VueApollo);
vue.use(Antd);

Object.keys({
  ...filters,
  ...ylFilters
}).forEach((key) => {
  vue.filter(key, filters[key]);
});

// sentry前端错误日志监控
process.env.NODE_ENV === 'production' && Sentry.init({
  dsn: $envConfig.sentryDsn,
  integrations: [
    new VueIntegration({
      vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],
  release: process.env.VUE_APP_RELEASE_VERSION,
  // logErrors: true, //设置为true,错误不但会发给平台，也会在页面正常显示，方便调试
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new vue({
  render: h => h(App),
  provide: apolloProvider.provide(),
  store,
  router
}).$mount('#app');