import vue from 'vue';
import router from './index';

const vm = new vue();

router.beforeEach((to, from, next) => {
  to.meta && (typeof to.meta.title !== 'undefined' && vm.$ylFunc.setDocumentTitle(`${to.meta.title} - ${vm.$ylFunc.domTitle()}`));
  next();
});

router.afterEach(() => {
  // NProgress.done(); // finish progress bar
});