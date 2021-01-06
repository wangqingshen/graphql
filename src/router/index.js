import vue from 'vue';
import router from 'vue-router';
import $envConfig from '@/config/env';

vue.use(router);

let routes = [];

const routerContext = require.context('./', true, /index\.js$/);
routerContext.keys().forEach(route => {
  // 如果是根目录的index.js不处理
  if (route.startsWith('./index')) return;
  const routerModule = routerContext(route);
  routes = [...routes, ...(routerModule.default || routerModule)];
});

export default new router({
  mode: 'hash',
  base: $envConfig.routerBaseUrl,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});